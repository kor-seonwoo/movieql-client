import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
    query getMovies {
        allMovies {
            id
            title
        }
    }
`;
export default function Movies() {
    const { data, loading, error } = useQuery(ALL_MOVIES);
    if (loading) {
        return <h1>데이터를 받아오는 중!!...</h1>
    }
    if (error) {
        return <h1>서버와 통신이 불안정합니다! 잠시후 다시 시도 부탁!!...</h1>
    }
    return (
        <ul>
            {
                data.allMovies.map((movie) => (
                    <li key={movie.id}>
                        <Link to={`/movies/${movie.id}`}>
                        {movie.title}
                        </Link>
                    </li>
                ))
            }
        </ul>
    );
}