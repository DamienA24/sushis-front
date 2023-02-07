import React from "react";

import twitterMedia from "../../assets/twitter.svg";
import openSeaMedia from "../../assets/opensea.svg";
import "./index.css";

function SocialMedia() {
  return (
    <div className="container-social-media">
      <a href={import.meta.env.VITE_TWITTER} target="_blank">
        <svg width={65} height={60}>
          <image href={twitterMedia} width={55} height={55} />
        </svg>
      </a>
      <a href="https://www.w3schools.com" target="_blank">
        <svg width={55} height={60}>
          <image href={openSeaMedia} width={55} height={55} />
        </svg>
      </a>
    </div>
  );
}

export default SocialMedia;
