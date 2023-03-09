import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

import { alchemySdk } from "../../../config";

const addressContract = import.meta.env.VITE_ADDRESS_CONTRACT;

function DisplaySushis() {
  const { address } = useAccount();
  const [loading, setLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [quantitiesNfts, setQuantities] = useState(0);

  useEffect(() => {
    getNfts();
  }, []);

  async function getNfts() {
    const result = await alchemySdk.nft.getNftsForOwner(address, {
      contractAddresses: [addressContract],
    });
    setNfts(result.ownedNfts);
    setQuantities(result.totalCount);
    setLoading(false);
  }

  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      <p>You have {quantitiesNfts} sushis</p>
      <div>
        {nfts.map((nft) => {
          return <p>{nft.rawMetadata.image}</p>;
        })}
      </div>
    </div>
  );
}

export default DisplaySushis;
