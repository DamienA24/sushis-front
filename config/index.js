import { Network, Alchemy } from "alchemy-sdk";

let alchemyKey = "";
let networksAuthorize = [
  {
    name: "maticmum",
    chainId: 80001,
    message: "Wrong Network, connect you on mumbai",
  },
  {
    name: "hardhat",
    chainId: 31337,
    message: "Wrong gNetwork, connect you on localhost",
  },
];

let settingsAlchemySdk = {
  apiKey: "",
  network: Network.MATIC_MUMBAI,
};

if (import.meta.env.VITE_NODE_ENV === "Development") {
  alchemyKey = import.meta.env.VITE_API_KEY_ALCHEMY;
}
if (import.meta.env.VITE_NODE_ENV === "production") {
  alchemyKey = process.env.API_KEY_ALCHEMY;
  networksAuthorize = [
    {
      name: "matic",
      chainId: 137,
      message: "Wrong Network, connect you on polygon matic",
    },
  ];
  settingsAlchemySdk.network = Network.MATIC_MAINNET;
}

settingsAlchemySdk.apiKey = alchemyKey;
const alchemySdk = new Alchemy(settingsAlchemySdk);

export { alchemyKey, networksAuthorize, alchemySdk };
