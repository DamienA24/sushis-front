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
    if (result.totalCount) {
      const urls = result.ownedNfts.reduce((acc, nft) => {
        const url = `https://ipfs.io/ipfs/${nft.rawMetadata.image.slice(7)}`;
        acc.push(url);
        return acc;
      }, []);
      setNfts(urls);
    }
    setQuantities(result.totalCount);
    setLoading(false);
  }

  return loading ? (
    <p>loading...</p>
  ) : (
    <div>
      <p>You have {quantitiesNfts} sushis</p>
      <div>
        {nfts.map((nftUrl) => {
          return (
            <img
              src={nftUrl}
              alt="background sushis"
              width="532"
              height="532"
            />
          );
          return <p>{nft.rawMetadata.image}</p>;
        })}
      </div>
    </div>
  );
}

export default DisplaySushis;
