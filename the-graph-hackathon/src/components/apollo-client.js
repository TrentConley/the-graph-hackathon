import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://gateway-arbitrum.network.thegraph.com/api/d1357ccb340846b7365b0da4215c44ee/subgraphs/id/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8',
    headers: {
       'Authorization': `d1357ccb340846b7365b0da4215c44ee`
    }
  }),
  cache: new InMemoryCache(),
});

export default client;