import React, { useState } from "react";
import { getPunkDetails } from "./query";
import { getPriceHistory } from "./query";

interface SearchBarProps {
  onSearch: (id: string) => void; // Function to handle the search
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSearch = async () => {
    console.log("searching");
    const data = await getPunkDetails(inputValue);
    const moredata = await getPriceHistory(1640995200, 1672444800);
    console.log(moredata);

    if (data && data.punk) {
      data.punk.events.forEach(async (event: any) => {
        if (event.type === "SALE") {
          const saleTimestamp = parseInt(event.timestamp, 10);
          const saleDate = new Date(saleTimestamp * 1000); // Converting Unix timestamp to JavaScript Date object
          const formattedDate = saleDate.toISOString().split("T")[0]; // Formatting to YYYY-MM-DD

          console.log(`Sale on ${formattedDate}, Amount: ${event.amount}`);
          const oneMonthPrior = saleTimestamp - 2592000; // Subtracting one month in seconds
          const priceHistory = await getPriceHistory(
            oneMonthPrior,
            saleTimestamp
          );
          console.log(`price history for the sale date: ${priceHistory}`);
          console.log(priceHistory);
        }
      });
    }
    console.log("finished search");
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter CryptoPunk ID"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
