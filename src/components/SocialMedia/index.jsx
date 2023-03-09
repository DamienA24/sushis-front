import { useAccount } from "wagmi";

import twitterMedia from "../../assets/twitter.svg";
import openSeaMedia from "../../assets/opensea.svg";
import "./index.css";

function SocialMedia({ handleSushis, seeSushis }) {
  const { isConnected } = useAccount();
  console.log(seeSushis);
  return (
    <div className="container-social-media">
      <p className={`text-see-sushis`} onClick={handleSushis}>
        {isConnected ? (seeSushis ? "Back to mint" : "See your sushis") : ""}
      </p>
      <div className="container-media">
        <a href={import.meta.env.VITE_TWITTER} target="_blank">
          <svg width={65} height={60}>
            <image href={twitterMedia} width={55} height={55} />
          </svg>
        </a>
        <a
          href="https://opensea.io/collection/delicious-sushis"
          target="_blank"
        >
          <svg width={55} height={60}>
            <image href={openSeaMedia} width={55} height={55} />
          </svg>
        </a>
      </div>
    </div>
  );
}

export default SocialMedia;
