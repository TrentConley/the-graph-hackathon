import React from "react";
import SearchBar from "../components/SearchBar";
import Graph from "../components/Graph";
import PunkDetails from "../components/PunkDetails";

const Home: React.FC = () => {
  // State and functions to handle CryptoPunks data will go here

  return (
    <div>
      <h1>See if your crypto punk is overpriced</h1>
      <SearchBar />
      {/* Pass data to Graph and PunkDetails as props */}
    </div>
  );
};

export default Home;
