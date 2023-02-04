import React from "react";

import ReactDOM from "react-dom/client";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { mainnet, goerli, localhost, hardhat } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";

import App from "./App";

import "./index.css";
const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, goerli, localhost, hardhat],
  [alchemyProvider({ apiKey: process.env.API_KEY_ALCHEMY }), publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
