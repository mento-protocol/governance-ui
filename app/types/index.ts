import { ContractAddresses } from "@mento-protocol/mento-sdk";
import { Address, ChainContract } from "viem";
import { Chain } from "viem/chains";

export type BadgeType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "success"
  | "info";

export type ButtonType =
  | "primary"
  | "secondary"
  | "tertiary"
  | "danger"
  | "warning"
  | "success"
  | "info"
  | "link"
  | "clear";

export type MentoChainContracts = {
  [K in keyof ContractAddresses]: ChainContract;
};

export type MentoChain = Chain & {
  contracts: Chain["contracts"] & MentoChainContracts;
};

export type VoteType = {
  total: bigint;
  participants: Array<Participant>;
};

export type Votes = {
  for: VoteType;
  against: VoteType;
  abstain: VoteType;
  total: bigint;
};

export type Participant = {
  address: Address;
  weight: bigint;
};
