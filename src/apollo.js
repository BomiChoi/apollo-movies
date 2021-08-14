import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://bomi-movieql-backend.herokuapp.com/",
    cache: new InMemoryCache(),
    resolvers: {
        Movie: {
            isLiked: () => false
        },
        Mutation: {
            toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
                cache.modify({
                    id: `Movie:${id}`,
                    fields: {
                        isLiked: (isLiked) => !isLiked, // 현재 isLiked 값을 받아서 true-false 토글
                    },
                });
            },
        },
    },
});

export default client;