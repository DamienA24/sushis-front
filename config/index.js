let alchemyKey = "";

if (import.meta.env.DEV) {
  alchemyKey = import.meta.env.VITE_API_KEY_ALCHEMY;
} else {
  alchemyKey = process.env.API_KEY_ALCHEMY;
}

export { alchemyKey };
