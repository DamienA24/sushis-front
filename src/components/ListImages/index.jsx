import React from "react";

import { isMobile } from "react-device-detect";

import sush1 from "../../assets/sush1.png";
import sush2 from "../../assets/sush2.png";
import sush3 from "../../assets/sush3.png";
import sush4 from "../../assets/sush4.png";

import "./index.css";

const images = [sush1, sush2, sush3, sush4];
function ListImages() {
  return (
    <div className="container-list-images">
      {isMobile ? (
        <img src={sush1} alt="background sushis" width="260" height="260" />
      ) : (
        images.map((image, index) => (
          <img
            src={image}
            key={index}
            alt="background sushis"
            width="260"
            height="260"
          />
        ))
      )}
    </div>
  );
}

export default ListImages;
