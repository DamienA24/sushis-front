import { useEffect, useState } from "react";

import { useAccount, useConnect, useNetwork, useDisconnect } from "wagmi";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { isMobile } from "react-device-detect";

import SocialMedia from "./components/SocialMedia";
import ListImages from "./components/ListImages";
import Text from "./components/Text";
import Mint from "./components/Mint";

import mainSushi from "./assets/mainSushi.png";
import { networksAuthorize } from "../config";
import eth from "./assets/eth.svg";

import "./App.css";

function App() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();

  async function handleConnection() {
    if (isMobile) {
      const provider = await detectEthereumProvider();
      if (provider?.isBraveWallet) {
        window.location.replace(import.meta.env.VITE_URL_APP_METAMASK);
      } else {
        checkIfCanConnect();
      }
    } else {
      checkIfCanConnect();
    }
  }

  async function checkIfCanConnect() {
    const authorizeToConnect = await checkProvider();
    if (authorizeToConnect) {
      connect();
    } else {
      alert(networksAuthorize[0].message);
    }
  }

  useEffect(() => {
    if (chain?.network) {
      const networkAuthorize = networksAuthorize.some(
        (network) => network.name === chain.network
      );
      if (!networkAuthorize) {
        disconnect();
        alert(networksAuthorize[0].message);
      }
      if (isMobile) {
        if (networkAuthorize) connect();
      }
    }
  }, [chain]);

  async function checkProvider() {
    const provider = await detectEthereumProvider();
    if (provider) {
      const chainId = await ethereum.request({ method: "eth_chainId" });
      const networkAuthorize = networksAuthorize.some(
        (network) => network.chainId === parseInt(chainId)
      );

      return networkAuthorize;
    }
    return false;
  }
  return (
    <div className="App">
      <SocialMedia />
      <ListImages />
      <div className="container-text-mint">
        <Text />
        {isConnected ? (
          ""
        ) : (
          <button
            className="button-to-connect"
            onClick={() => handleConnection()}
          >
            <img
              src={eth}
              alt="background sushis"
              height="20"
              style={{ marginRight: "10px" }}
            />
            Free mint
          </button>
        )}
      </div>
      <div className="container-sushi-mint">
        {isConnected ? (
          <Mint />
        ) : isMobile ? (
          ""
        ) : (
          <img
            src={mainSushi}
            alt="background sushis"
            width="532"
            height="389"
          />
        )}
      </div>
    </div>
  );
}

export default App;
