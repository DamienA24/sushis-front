import react, { useState, useEffect } from "react";

import {
  usePrepareContractWrite,
  useContractEvent,
  useContractWrite,
  useContractRead,
  useAccount,
} from "wagmi";

import abi from "../../abi/index.json";
import "./index.css";

const addressContract = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function Mint() {
  const [quantity, setQuantity] = useState(0);
  const [supply, setSupply] = useState(0);
  const { address } = useAccount();

  const { config } = usePrepareContractWrite({
    address: addressContract,
    abi,
    functionName: "mint",
    args: [parseInt(quantity)],
    overrides: { gasLimit: 1e7 },
  });

  const { data, isLoading, isSuccess, write, status } =
    useContractWrite(config);

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

  return (
    <div className="container-mint">
      {resultBalance == 10 ? (
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
