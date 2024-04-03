import { ContractAddresses } from "@mento-protocol/mento-sdk";
import { ChainContract } from "viem";
import { Chain } from "viem/chains";

export type BadgeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "success"
  | "info";

export type MentoChainContracts = {
  [K in keyof ContractAddresses]: ChainContract;
};

export type MentoChain = Chain & {
  contracts: Chain["contracts"] & MentoChainContracts;
};
