import React from "react";

import ReactDOM from "react-dom/client";
import { mainnet, goerli, localhost, hardhat } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { alchemyKey } from "../config";
import App from "./App";

import "./index.css";
const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli, localhost, hardhat],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
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
