import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const GET_MOVIE = gql`
    query getMovie($movieId: Int!) {
        movie(id: $movieId) {
            id
            title_long
            medium_cover_image
            rating
            runtime
            language
            isLiked @client 
        }
    }
`;
/*
GET_MOVIE query에 isLiked @client는 사용자가 like버튼을 눌렀는지 확인을 하는 값을 저장할 것이다.
하지만 내가 만든 api movie 필드에는 isLiked가 존재하지 않기에 @client 속성을 활용하여 로컬 전용 필드임을 아폴로 클라이언트에 알려
query가 날라갈 때 생략되도록 할 수 있다.
*/

const Container = styled.div`
  height: 100vh;
  background-image: linear-gradient(-45deg, #f5f5f5, #fd9a11);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: white;
`;

const Column = styled.div`
  margin-left: 10px;
  width: 50%;
`;

const Title = styled.h1`
  font-size: 65px;
  margin-bottom: 15px;
`;

const Subtitle = styled.h4`
  font-size: 35px;
  margin-bottom: 20px;
`;

const LikeBtn = styled.button`
    padding: 5px 15px;
    background-color: #ffffff;
    border: 0;
    border-radius: 10px;
    font-size: 18px;
    cursor: pointer;
    &:hover{
        box-shadow: 2px 2px 85px #f5f5f5;
    }
`;

const Image = styled.div`
  width: 25%;
  height: 60%;
  background-color: transparent;
  background-image: url(${(props) => props.bg});
  background-size: cover;
  background-position: center center;
  border-radius: 7px;
`;

export default function Movie() {
    const {id} = useParams();
    const pageId = Number(id);
    const {data, loading, client:{cache},} = useQuery(GET_MOVIE, {
        variables: {
            movieId: pageId
        },
        // fetchPolicy:'cache-and-network'
        /* 
        fetchPolicy옵션을 따로 사용하지 않는다면 client.js에서 설정한 cache: new InMemoryCache(), 의해 
        fetching한 data는 InMemoryCache에 저장된다.
        이는 즉, fetching한 페이지를 두 번째 방문하게되면 fetching이 이루어 지지 않고 InMemoryCache에 저장된 data를 가져오게된다.

        이게 싫다면 fetchPolicy:'cache-and-network' 옵션을 이용하게되면 캐시 확인과 서버 요청이 모두 발생한다.
        요청한 data가 캐시에 있는 경우 일단 캐시 data를 반환한다.
        서버의 응답 data가 캐시 data와 다를 경우 캐시 data를 업데이트 시키고 data를 반환하게된다.
        */
    });
    const onClick = () => {
        cache.writeFragment({
            id: `Movie:${pageId}`,
            fragment: gql`
                fragment MovieFragment on Movie {
                    isLiked
                }
            `,
            data: {
                isLiked: !data.movie.isLiked,
            },
        });
        /*
        내가 원하는 MovieId data를 가진 cache의 MovieFragment이름의 fragment 객체를 write하는 코드이다.
        */
    };
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : data?.movie?.title_long}</Title>
                {!loading && data?.movie && (
                    <>
                        <Subtitle>🕒 {data.movie.runtime}</Subtitle>
                        <Subtitle>⭐️ {data.movie.rating}</Subtitle>
                        <LikeBtn onClick={onClick}>{data.movie.isLiked ? "Unlike 👎":"Like 👍"}</LikeBtn>
                    </>
                )}
            </Column>
            {!loading && data?.movie && <Image bg={data.movie.medium_cover_image} />}
        </Container>
    );
}