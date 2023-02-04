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

  function handleConnection() {
    if (isMobile) {
      window.location.replace(
        "https://metamask.app.link/dapp/sushis-front.vercel.app/"
      );
    }
    connect();
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
