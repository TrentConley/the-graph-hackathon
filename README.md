README for The Graph Hackathon Project: CryptoPunk Valuation Tool

## README for The Graph Hackathon Project: CryptoPunk Valuation Tool

### Table of Contents

1. [Overview](#overview)
2. [Website URL](#website-url)
3. [Repository Structure](#repository-structure)
4. [How It Works](#how-it-works)
   - [Interacting with Subgraphs](#interacting-with-subgraphs)
   - [Querying Data](#querying-data)
   - [Evaluating NFT Value](#evaluating-nft-value)
5. [User Interface](#user-interface)
6. [Key Components](#key-components)
7. [Future Enhancements](#future-enhancements)
8. [Author](#author)

## Overview

This project, developed during The Graph Hackathon, presents a specialized tool for evaluating the market value of CryptoPunk NFTs. It is designed to help users determine whether a particular CryptoPunk is overpriced, underpriced, or fairly priced. The tool leverages the power of The Graph, a decentralized protocol for indexing and querying blockchain data, to access real-time market data from two distinct subgraphs: Uniswap and CryptoPunks.

## Website URL

The application is hosted at: CryptoPunk Valuation Tool visit www.the-graph-hackathon-6l2l.vercel.app

## Repository Structure

All code relevant to this project is located in the the-graph-hackathon folder.

## How It Works

### Interacting with Subgraphs

The application interacts with two subgraphs:

CryptoPunks Subgraph: This subgraph provides detailed historical data about individual CryptoPunks, including past sales events, ownership transfers, and price changes.

Uniswap Subgraph: This subgraph is used to analyze broader market trends, particularly focusing on the price changes of cryptocurrencies involved in CryptoPunk transactions.

### Querying Data

All data querying is centralized in the queries.ts file, which contains the GraphQL queries necessary to retrieve data from The Graph. We utilize the Apollo Client to perform these queries efficiently and handle the returned data within our React application.

### Evaluating NFT Value

The core functionality of the tool is to evaluate the 'hype' behind a CryptoPunk NFT, which often inflates its value. By examining historical sales data and recent price trends, the tool calculates the average price changes over time. This information, combined with the user-provided ask price, forms the basis of our assessment of the NFT's current market value.

## User Interface

The application features a main Home component that hosts the SearchBar. Users can input the ID of a CryptoPunk NFT and their desired ask price in Ethereum (ETH). Upon submission, the application fetches and displays relevant sales data, historical price changes, and an evaluation of whether the NFT is overpriced or a potential good deal.

## Key Components

SearchBar: The primary user interface for inputting CryptoPunk IDs and ask prices.
Graph: A component (planned for future development) for visualizing price trends and sales data.
PunkDetails: A component for displaying detailed information about a specific CryptoPunk.

## Future Enhancements

Future developments may include more advanced analytics, integration with additional subgraphs for broader market analysis, and enhanced visualization tools to provide a more interactive user experience.

## Author

Produced by Trent Conley.
