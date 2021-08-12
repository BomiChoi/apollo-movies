import React from "react";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    background-color: black;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
`;
const Column = styled.div`
    width: 500px;
    padding: 20px;
`;
const Title = styled.h1`
    font-size: 65px;
    margin-bottom: 15px;
`;
const Subtitle = styled.h4`
    font-size: 35px;
    margin-bottom: 10px;
`;
const Description = styled.p`
    display: -webkit-box;
    font-size: 28px;
    height: 280px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 10;
    -webkit-box-orient: vertical;
`;
const Poster = styled.div`
    background-image: url(${props => props.bg});
    width: 300px;
    height: 450px;
    background-size: cover;
    background-position: center center;
`;

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            title
            medium_cover_image
            language
            rating
            description_intro
        }
    }
`;

export default () => {
    const { id } = useParams();
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id) }
    });
    return (
        <Container>
            <Column>
                <Title>{loading ? "Loading..." : data.movie.title}</Title>
                {!loading && data.movie &&
                    (<>
                        <Subtitle>{data.movie.language} · {data.movie.rating}</Subtitle>
                        <Description>{data.movie.description_intro}</Description>
                    </>)
                }
            </Column>
            <Poster bg={data && data.movie ? data.movie.medium_cover_image : ""}></Poster>
        </Container>
    )
};