import { useState, useEffect } from "react";

import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";

import abi from "../../abi/index.json";
import "./index.css";

const addressContract = import.meta.env.VITE_ADDRESS_CONTRACT;
const MAX_SUPPLY = 10000;

function Mint() {
  const [quantity, setQuantity] = useState(0);
  const [maxSupply, setSupply] = useState(false);
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: addressContract,
    abi,
    functionName: "mint",
    args: [parseInt(quantity)],
    overrides: { gasLimit: 1e7 },
  });

  const { isSuccess, write } = useContractWrite(config);

  const { data: result, isSuccess: successSupply } = useContractRead({
    address: addressContract,
    abi,
    functionName: "totalSupply",
    watch: true,
  });

  const { data: resultBalance } = useContractRead({
    address: addressContract,
    abi,
    functionName: "balanceOf",
    args: [address],
    watch: true,
  });

  function handleLess() {
    if (quantity) {
      setQuantity(quantity - 1);
    }
  }
  function handleMore() {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setQuantity(0);
    }
  }, [isSuccess]);

  useEffect(() => {
    const newSupply = parseInt(result);

    if (newSupply === MAX_SUPPLY) {
      setSupply(true);
    }
  }, [result]);

  return (
    <div className="container-mint">
      {maxSupply ? (
        <p>All nfts minted, next time maybe :)</p>
      ) : resultBalance == 10 ? (
        <p>You already minted your 10 sushis</p>
      ) : (
        <>
          <div className="container-quantities">
            <p>{parseInt(result)} / 10000</p>
            <p>
              Quantities <button onClick={() => handleLess()}>-</button>{" "}
              {quantity} <button onClick={() => handleMore()}>+</button>
            </p>
          </div>
          <button className="button-mint" onClick={() => write?.()}>
            Free mint
          </button>
        </>
      )}
    </div>
  );
}

export default Mint;
