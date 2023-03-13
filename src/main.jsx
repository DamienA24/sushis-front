import React from "react";

import ReactDOM from "react-dom/client";
import { polygon, polygonMumbai, localhost, hardhat } from "wagmi/chains";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { Analytics } from "@vercel/analytics/react";

import { alchemyKey } from "../config";
import App from "./App";

import "./index.css";
const { provider, webSocketProvider } = configureChains(
  [polygon, localhost, hardhat, polygonMumbai],
  [alchemyProvider({ apiKey: alchemyKey }), publicProvider()]
);

const wagmiClient = createClient({
  provider,
  webSocketProvider,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <App />
      <Analytics />
    </WagmiConfig>
  </React.StrictMode>
);
