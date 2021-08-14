import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    height: 400px;
    width: 100%;
    overflow: hidden;
`;
const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 360px;
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 7px;
`;
const LikeBtn = styled.button`
    height: 25px;
    width: 25px;
    font-size: 20px;
    background-color: black;
    border: none;
    color: white;
    cursor: pointer;
`;

const GET_MOVIE = gql`
    query getMovie($id: Int!) {
        movie(id: $id) {
            id
            title
            medium_cover_image
            language
            rating
            description_intro
            isLiked @client
        }
    }
`;

const TOGGLE_LIKE_MOVIE = gql`
    mutation toggleLikeMovie($id: Int!) {
        toggleLikeMovie(id:$id) @client
    }
`;

export default ({ id, bg, isLiked }) => {
    const { loading, data } = useQuery(GET_MOVIE, {
        variables: { id: parseInt(id) }
    });
    const [toggleLikeMovie] = useMutation(
        TOGGLE_LIKE_MOVIE,
        { variables: { id: parseInt(id) } }
    );
    return (
        <Container>
            <Link to={`/${id}`}>
                <Poster bg={bg}></Poster>
            </Link>
            <LikeBtn onClick={toggleLikeMovie} >{isLiked ? "❤️" : "🤍"}</LikeBtn>
        </Container>
    );
};