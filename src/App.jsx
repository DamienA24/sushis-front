import { useEffect } from "react";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { useAccount, useConnect } from "wagmi";
import { isMobile } from "react-device-detect";

import SocialMedia from "./components/SocialMedia";
import ListImages from "./components/ListImages";
import Text from "./components/Text";
import Mint from "./components/Mint";

import mainSushi from "./assets/mainSushi.png";
import eth from "./assets/eth.svg";
import "./App.css";

function App() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });

  async function handleConnection() {
    if (isMobile) {
      window.location.replace(import.meta.env.VITE_URL_APP_METAMASK);
    } else {
      connect();
    }
  }

  useEffect(() => {
    if (isMobile) {
      connect();
    }
  }, []);

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
