import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import Movie from "../components/Movie";

const Container = styled.div`
    color: red;
    text-align: center;
    font-weight: bold;
    background-color: black;
    min-height: 100vh;
`;
const Header = styled.header`
    height: 170px;
    width: 100%;
    padding-top: 50px;
    box-sizing: border-box;
    background-color: black;
`;
const Title = styled.h1`
    font-size: 50px;
    
`;
const Subtitle = styled.h2`
    font-size: 25px;
`;
const Loading = styled.div`
    font-size: 25px;
    opacity: 0.5;
    font-weight: 500;
    margin-top: 10px;
    padding-top: 200px;
`;
const Movies = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    grid-gap: 25px;
    width: 100%;
    position: relative;
    padding: 30px;
    box-sizing: border-box;
`;

const GET_MOVIES = gql`
    query {
        movies(rating: 9.0) {
            id
            medium_cover_image
            isLiked @client
        }
    }
`;

export default () => {
    const { loading, data } = useQuery(GET_MOVIES);
    return (
        <Container>
            <Header>
                <Title>Apollo Movies</Title>
                <Subtitle>I love GraphQL</Subtitle>
            </Header>
            {loading && <Loading>Loading...</Loading>}
            {!loading && data.movies &&
                <Movies>
                    {data.movies.map(m =>
                        <Movie
                            key={m.id}
                            id={m.id}
                            isLiked={m.isLiked}
                            bg={m.medium_cover_image}
                        />
                    )}
                </Movies>
            }
        </Container>
    );
};