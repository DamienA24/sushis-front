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
    message: "Wron gNetwork, connect you on localhost",
  },
];
if (import.meta.env.DEV) {
  alchemyKey = import.meta.env.VITE_API_KEY_ALCHEMY;
} else {
  alchemyKey = process.env.API_KEY_ALCHEMY;
  networksAuthorize = [
    {
      name: "matic",
      chainId: 137,
      message: "Wrong Network, connect you on polygon matic",
    },
  ];
}

export { alchemyKey, networksAuthorize };
