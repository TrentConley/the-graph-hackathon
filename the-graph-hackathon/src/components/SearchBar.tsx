import React, { useState } from "react";
import { getPunkDetails, getPriceHistory } from "./query";
import Web3 from "web3";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [askPrice, setAskPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleSearch = async () => {
    setIsLoading(true);
    setResult("");
    try {
      const data = await getPunkDetails(inputValue);

      let totalRatios = 0;
      let saleCount = 0;

      if (data && data.punk) {
        for (const event of data.punk.events) {
          if (event.type === "SALE") {
            const saleTimestamp = parseInt(event.timestamp, 10);
            const saleDate = new Date(saleTimestamp * 1000); // Converting Unix timestamp to JavaScript Date object
            const formattedDate = saleDate.toISOString().split("T")[0]; // Formatting to YYYY-MM-DD
            const salePriceWei = event.amount;
            const salePriceEth = parseFloat(
              Web3.utils.fromWei(salePriceWei.toString(), "ether")
            );

            console.log(
              `Sale on ${formattedDate}, Amount: ${salePriceEth} ETH`
            );

            console.log(`Sale on ${formattedDate}, Amount: ${event.amount}`);
            const oneMonthPrior = saleTimestamp - 2592000; // Subtracting one month in seconds
            const priceHistory = await getPriceHistory(
              oneMonthPrior,
              saleTimestamp
            );

            // Calculate the ratio and add to total
            const salePrice = parseFloat(event.amount);
            const oneMonthPriceChange = priceHistory?.oneMonthPriceChange;
            if (
              priceHistory &&
              priceHistory.oneMonthPriceChange !== undefined &&
              priceHistory.oneMonthPriceChange !== 0
            ) {
              const ratio = salePriceEth / priceHistory.oneMonthPriceChange;
              totalRatios += ratio;
              saleCount++;
            }

            console.log(`price history for the sale date:`, priceHistory);
          }
        }
      }

      // Calculate and log the average ratio
      const averageRatio = saleCount > 0 ? totalRatios / saleCount : 0;
      console.log(`Average Ratio: ${averageRatio}`);

      const today = Math.floor(Date.now() / 1000);
      const oneMonthAgo = today - 2592000;
      const priceHistoryToday = await getPriceHistory(oneMonthAgo, today);
      console.log(`Price history for the past month:`, priceHistoryToday);

      // Calculate the product of the average ratio and the one month change in price
      let product = 0;
      if (priceHistoryToday && "oneMonthPriceChange" in priceHistoryToday) {
        product = averageRatio * priceHistoryToday.oneMonthPriceChange;
      }
      console.log(
        `Product of Average Ratio and One Month Price Change: ${product}`
      );
      const askPriceFloat = parseFloat(askPrice);
      const margin = 0.02 * product; // 2% margin
      let message = "The NFT is priced appropriately.";
      if (askPriceFloat > product + margin) {
        message = "The NFT is overpriced.";
      } else if (askPriceFloat < product - margin) {
        message = "The NFT is a good deal.";
      }
      setResult(message);
    } catch (error) {
      console.error("Error during search", error);
      setResult("Error occurred during search.");
    }
    setIsLoading(false);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter CryptoPunk ID"
      />
      <input
        className="search-input"
        type="text"
        value={askPrice}
        onChange={(e) => setAskPrice(e.target.value)}
        placeholder="Enter Ask Price"
      />
      <button
        className="search-button"
        onClick={handleSearch}
        disabled={!inputValue || !askPrice}
      >
        Search
      </button>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="result">{result}</div>
      )}
    </div>
  );
};

export default SearchBar;
