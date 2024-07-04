import { Alfajores, Celo } from "@/config/chains";

export const ensureChainId = (chainId?: number) => {
  if (chainId !== Celo.id && chainId !== Alfajores.id) {
    return Celo.id;
  } else {
    return chainId;
  }
};
