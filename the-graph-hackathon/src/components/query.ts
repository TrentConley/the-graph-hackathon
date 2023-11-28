// queries.ts
import { gql } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export async function getPunkDetails(punkID: string) {
  console.log(punkID);
  const client = new ApolloClient({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/d1357ccb340846b7365b0da4215c44ee/subgraphs/id/2hTKKMwLsdfJm9N7gUeajkgg8sdJwky56Zpkvg8ZcyP8", // replace with your GraphQL server URI
    cache: new InMemoryCache(),
  });
  const GET_PUNK_DETAILS = gql`
    query GetPunkDetails($punkID: ID!) {
      punk(id: $punkID) {
        events {
          type
          timestamp
          amount
          from {
            id
          }
          to {
            id
          }
        }
      }
    }
  `;
  return client
    .query({
      query: GET_PUNK_DETAILS,
      variables: { punkID },
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
}

export async function getPriceHistory(startDate: number, endDate: number) {
  // Then use these integer values in your query
  const client = new ApolloClient({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/d1357ccb340846b7365b0da4215c44ee/subgraphs/id/A3Np3RQbaBA6oKJgiwDJeo5T3zrYfGHPWFYayMwtNDum",
    cache: new InMemoryCache(),
  });

  const GET_PRICE_HISTORY = gql`
    query GetPriceHistory($startDate: Int, $endDate: Int) {
      pairDayDatas(
        where: {
          pairAddress: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc"
          date_gte: $startDate
          date_lte: $endDate
        }
        orderBy: date
        orderDirection: asc
      ) {
        id
        date
        dailyVolumeToken0
        dailyVolumeToken1
        dailyVolumeUSD
        dailyTxns
        reserve0
        reserve1
        reserveUSD
        totalSupply
        token0 {
          id
          symbol
          name
        }
        token1 {
          id
          symbol
          name
        }
      }
    }
  `;

  return client
    .query({
      query: GET_PRICE_HISTORY,
      variables: { startDate, endDate },
    })
    .then((response) => {
      const data = response.data.pairDayDatas;

      // Initialize variables to store cumulative values
      let totalVolume = 0;
      let previousPrice: any = null;
      let priceChanges: any = [];
      let startPrice = 0,
        endPrice = 0;

      data.forEach((dayData: any, index: any) => {
        const reserve0 = parseFloat(dayData.reserve0);
        const reserve1 = parseFloat(dayData.reserve1);
        const dailyVolumeUSD = parseFloat(dayData.dailyVolumeUSD);

        // Calculate current price
        const currentPrice = reserve0 / reserve1;
        if (index === 0) {
          startPrice = currentPrice;
        }
        if (index === data.length - 1) {
          endPrice = currentPrice;
        }

        // Add to total volume
        totalVolume += dailyVolumeUSD;

        // Calculate daily price change percentage
        if (previousPrice !== null) {
          const dailyChange =
            ((currentPrice - previousPrice) / previousPrice) * 100;
          priceChanges.push(dailyChange);
        }
        previousPrice = currentPrice;
      });

      // Calculate volatility (standard deviation of price changes)
      const meanChange =
        priceChanges.reduce((a, b) => a + b, 0) / priceChanges.length;
      const volatility = Math.sqrt(
        priceChanges.reduce((a, b) => a + Math.pow(b - meanChange, 2), 0) /
          priceChanges.length
      );

      // Calculate average volume
      const averageVolume = totalVolume / data.length;

      // Calculate price change between start and end dates
      const oneMonthPriceChange =
        startPrice !== 0 ? ((endPrice - startPrice) / startPrice) * 100 : 0;

      // Calculate volatility, average volume, and one month price change here

      return {
        data,
        volatility,
        averageVolume,
        oneMonthPriceChange,
      };
    })
    .catch((error) => console.error(error));
}
