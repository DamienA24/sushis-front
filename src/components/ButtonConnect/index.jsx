import { useAccount } from "wagmi";

import eth from "../../assets/eth.svg";

function ButtonConnect({ handleConnection }) {
  const { isConnected } = useAccount();

  return (
    <>
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
    </>
  );
}

export default ButtonConnect;
