import { celo, celoAlfajores } from "viem/chains";

export const subgraphApiNames = {
  [celoAlfajores.id]: "subgraphAlfajores",
  [celo.id]: "subgraph",
  // Considered default
  [0]: "subgraph",
};

export const isValidChainId = (
  k: number,
): k is keyof typeof subgraphApiNames => {
  return k in subgraphApiNames;
};

export const getSubgraphApiName = (chainId: number | undefined) => {
  if (!chainId || !isValidChainId(chainId)) return subgraphApiNames[0];
  return subgraphApiNames[chainId];
};

export const CELO_BLOCK_TIME = 1000; // 1 seconds
