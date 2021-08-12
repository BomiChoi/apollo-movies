import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "http://3.35.140.119:4000/",
    cache: new InMemoryCache(),
});

export default client;