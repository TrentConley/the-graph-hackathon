import React from "react";
import SearchBar from "../components/SearchBar";
import Graph from "../components/Graph";
import PunkDetails from "../components/PunkDetails";
import styles from "../styles/Home.module.css";

const Home: React.FC = () => {
  // State and functions to handle CryptoPunks data will go here

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>See if your crypto punk is overpriced</h1>
      <SearchBar />
      {/* Pass data to Graph and PunkDetails as props */}

      <div className={styles.bio}>
        <p>
          Welcome to our CryptoPunk valuation tool, where we leverage the power
          of The Graph, a decentralized protocol for indexing and querying
          blockchain data. Here's how it works:
        </p>
        <p>
          Simply enter the ID of your CryptoPunk NFT along with your desired ask
          price. Our tool then queries The Graph for detailed historical data
          about your punk, including sale events and price fluctuations. We
          analyze this data to calculate the average price changes and compare
          them to your ask price. This process allows us to provide an informed
          assessment of whether your NFT is overpriced, underpriced, or just
          right.
        </p>
        <p>Produced by Trent Conley.</p>
      </div>
    </div>
  );
};

export default Home;
