import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
    query getMovie($movieId: Int!) {
        movie(id: $movieId) {
            id
            title
        }
    }
`;

export default function Movie() {
    const {id} = useParams();
    const pageId = Number(id);
    const {data, loading, error} = useQuery(GET_MOVIE, {
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
    if (loading) {
        return <h1>영화 정보를 가져오는 중!!</h1>
    }
    if (error) {
        return <h1>서버와 통신이 불안정합니다! 잠시후 다시 시도 부탁!!...</h1>
    }
    return <div>{data.movie.title}</div>;
}