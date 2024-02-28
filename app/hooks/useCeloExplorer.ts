import { useChainId } from "wagmi";
import loadEnvVar from "../helpers/load-env-var";

const CELO_EXPLORER_API_URL = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL,
);
const CELO_EXPLORER_API_URL_ALFAJORES = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL_ALFAJORES,
);
const CELO_EXPLORER_API_URL_BAKLAVA = loadEnvVar(
  process.env.NEXT_PUBLIC_CELO_EXPLORER_API_URL_BAKLAVA,
);

type CeloExplorerApi = {
  name: "celoExplorer" | "celoExplorerAlfajores" | "celoExplorerBaklava";
  url: string;
};

export const useCeloExplorerApi = (): CeloExplorerApi => {
  const chainId = useChainId();
  let result: CeloExplorerApi = {
    name: "celoExplorer",
    url: CELO_EXPLORER_API_URL,
  };

  if (chainId === 44787) {
    result = {
      name: "celoExplorerAlfajores",
      url: CELO_EXPLORER_API_URL_ALFAJORES,
    };
  }

  if (chainId === 62320) {
    result = {
      name: "celoExplorerBaklava",
      url: CELO_EXPLORER_API_URL_BAKLAVA,
    };
  }

  return result;
};
