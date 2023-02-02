import React from "react";

import twitterMedia from "../../assets/twitter.svg";
import openSeaMedia from "../../assets/opensea.svg";
import "./index.css";

function SocialMedia() {
  return (
    <div className="container-social-media">
      <svg width={65} height={60}>
        <image href={twitterMedia} width={55} height={55} />
      </svg>
      <svg width={55} height={60}>
        <image href={openSeaMedia} width={55} height={55} />
      </svg>
    </div>
  );
}

export default SocialMedia;
