/* eslint-disable */
import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  AddressHash: { input: any; output: any };
  Data: { input: any; output: any };
  DateTime: { input: any; output: any };
  Decimal: { input: any; output: any };
  FullHash: { input: any; output: any };
  Json: { input: any; output: any };
  NonceHash: { input: any; output: any };
  Wei: { input: any; output: any };
};

/** A stored representation of a Web3 address. */
export type Address = {
  __typename?: "Address";
  celoAccount?: Maybe<CeloAccount>;
  celoValidator?: Maybe<CeloValidator>;
  celoValidatorGroup?: Maybe<CeloValidatorGroup>;
  contractCode?: Maybe<Scalars["Data"]["output"]>;
  fetchedCoinBalance?: Maybe<Scalars["Wei"]["output"]>;
  fetchedCoinBalanceBlockNumber?: Maybe<Scalars["Int"]["output"]>;
  hash?: Maybe<Scalars["AddressHash"]["output"]>;
  online?: Maybe<Scalars["Boolean"]["output"]>;
  smartContract?: Maybe<SmartContract>;
  transactions?: Maybe<TransactionConnection>;
};

/** A stored representation of a Web3 address. */
export type AddressTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  order?: InputMaybe<SortOrder>;
};

/**
 * A package of data that contains zero or more transactions, the hash of the previous block ("parent"), and optionally
 * other data. Because each block (except for the initial "genesis block") points to the previous block, the data
 * structure that they form is called a "blockchain".
 */
export type Block = {
  __typename?: "Block";
  consensus?: Maybe<Scalars["Boolean"]["output"]>;
  difficulty?: Maybe<Scalars["Decimal"]["output"]>;
  gasLimit?: Maybe<Scalars["Decimal"]["output"]>;
  gasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  hash?: Maybe<Scalars["FullHash"]["output"]>;
  minerHash?: Maybe<Scalars["AddressHash"]["output"]>;
  nonce?: Maybe<Scalars["NonceHash"]["output"]>;
  number?: Maybe<Scalars["Int"]["output"]>;
  parentHash?: Maybe<Scalars["FullHash"]["output"]>;
  size?: Maybe<Scalars["Int"]["output"]>;
  timestamp?: Maybe<Scalars["DateTime"]["output"]>;
  totalDifficulty?: Maybe<Scalars["Decimal"]["output"]>;
};

export enum CallType {
  Call = "CALL",
  Callcode = "CALLCODE",
  Delegatecall = "DELEGATECALL",
  Staticcall = "STATICCALL",
}

/** Celo account information */
export type CeloAccount = {
  __typename?: "CeloAccount";
  accountType?: Maybe<Scalars["String"]["output"]>;
  activeGold?: Maybe<Scalars["Wei"]["output"]>;
  address?: Maybe<Scalars["AddressHash"]["output"]>;
  addressInfo?: Maybe<Address>;
  attestationsFulfilled?: Maybe<Scalars["Int"]["output"]>;
  attestationsRequested?: Maybe<Scalars["Int"]["output"]>;
  claims?: Maybe<CeloClaimsConnection>;
  group?: Maybe<CeloValidatorGroup>;
  lockedGold?: Maybe<Scalars["Wei"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  nonvotingLockedGold?: Maybe<Scalars["Wei"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  usd?: Maybe<Scalars["Wei"]["output"]>;
  validator?: Maybe<CeloValidator>;
  voted?: Maybe<CeloValidatorGroupConnection>;
  votes?: Maybe<Scalars["Wei"]["output"]>;
};

/** Celo account information */
export type CeloAccountClaimsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Celo account information */
export type CeloAccountVotedArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CeloAccountConnection = {
  __typename?: "CeloAccountConnection";
  edges?: Maybe<Array<Maybe<CeloAccountEdge>>>;
  pageInfo: PageInfo;
};

export type CeloAccountEdge = {
  __typename?: "CeloAccountEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CeloAccount>;
};

/** Celo Claims */
export type CeloClaims = {
  __typename?: "CeloClaims";
  address?: Maybe<Scalars["AddressHash"]["output"]>;
  element?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
  verified?: Maybe<Scalars["Boolean"]["output"]>;
};

export type CeloClaimsConnection = {
  __typename?: "CeloClaimsConnection";
  edges?: Maybe<Array<Maybe<CeloClaimsEdge>>>;
  pageInfo: PageInfo;
};

export type CeloClaimsEdge = {
  __typename?: "CeloClaimsEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CeloClaims>;
};

/** Celo network parameters */
export type CeloParameters = {
  __typename?: "CeloParameters";
  celoToken?: Maybe<Scalars["AddressHash"]["output"]>;
  /** @deprecated Use celoToken instead. */
  goldToken?: Maybe<Scalars["AddressHash"]["output"]>;
  maxElectableValidators?: Maybe<Scalars["Int"]["output"]>;
  minElectableValidators?: Maybe<Scalars["Int"]["output"]>;
  numRegisteredValidators?: Maybe<Scalars["Int"]["output"]>;
  /** @deprecated Use stableTokens instead. */
  stableToken?: Maybe<Scalars["AddressHash"]["output"]>;
  stableTokens?: Maybe<CeloStableCoins>;
  totalLockedGold?: Maybe<Scalars["Wei"]["output"]>;
};

/** Celo stable coins */
export type CeloStableCoins = {
  __typename?: "CeloStableCoins";
  ceur?: Maybe<Scalars["AddressHash"]["output"]>;
  creal?: Maybe<Scalars["AddressHash"]["output"]>;
  cusd?: Maybe<Scalars["AddressHash"]["output"]>;
};

/** Represents a CELO or usd token transfer between addresses. */
export type CeloTransfer = Node & {
  __typename?: "CeloTransfer";
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  fromAccountHash?: Maybe<Scalars["AddressHash"]["output"]>;
  fromAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  gasPrice?: Maybe<Scalars["Wei"]["output"]>;
  gasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  input?: Maybe<Scalars["String"]["output"]>;
  logIndex?: Maybe<Scalars["Int"]["output"]>;
  timestamp?: Maybe<Scalars["DateTime"]["output"]>;
  toAccountHash?: Maybe<Scalars["AddressHash"]["output"]>;
  toAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  token?: Maybe<Scalars["String"]["output"]>;
  tokenAddress?: Maybe<Scalars["String"]["output"]>;
  tokenId?: Maybe<Scalars["Decimal"]["output"]>;
  tokenType?: Maybe<Scalars["String"]["output"]>;
  transactionHash?: Maybe<Scalars["FullHash"]["output"]>;
  value?: Maybe<Scalars["Decimal"]["output"]>;
};

export type CeloTransferConnection = {
  __typename?: "CeloTransferConnection";
  edges?: Maybe<Array<Maybe<CeloTransferEdge>>>;
  pageInfo: PageInfo;
};

export type CeloTransferEdge = {
  __typename?: "CeloTransferEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CeloTransfer>;
};

/** Celo validator information */
export type CeloValidator = {
  __typename?: "CeloValidator";
  account?: Maybe<CeloAccount>;
  activeGold?: Maybe<Scalars["Wei"]["output"]>;
  address?: Maybe<Scalars["AddressHash"]["output"]>;
  addressInfo?: Maybe<Address>;
  attestationsFulfilled?: Maybe<Scalars["Int"]["output"]>;
  attestationsRequested?: Maybe<Scalars["Int"]["output"]>;
  groupAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  groupInfo?: Maybe<CeloValidatorGroup>;
  lastElected?: Maybe<Scalars["Int"]["output"]>;
  lastOnline?: Maybe<Scalars["Int"]["output"]>;
  lockedGold?: Maybe<Scalars["Wei"]["output"]>;
  member?: Maybe<Scalars["Int"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  nonvotingLockedGold?: Maybe<Scalars["Wei"]["output"]>;
  score?: Maybe<Scalars["Wei"]["output"]>;
  signerAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  usd?: Maybe<Scalars["Wei"]["output"]>;
};

export type CeloValidatorConnection = {
  __typename?: "CeloValidatorConnection";
  edges?: Maybe<Array<Maybe<CeloValidatorEdge>>>;
  pageInfo: PageInfo;
};

export type CeloValidatorEdge = {
  __typename?: "CeloValidatorEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CeloValidator>;
};

/** Celo validator group information */
export type CeloValidatorGroup = {
  __typename?: "CeloValidatorGroup";
  account?: Maybe<CeloAccount>;
  accumulatedActive?: Maybe<Scalars["Wei"]["output"]>;
  accumulatedRewards?: Maybe<Scalars["Wei"]["output"]>;
  activeGold?: Maybe<Scalars["Wei"]["output"]>;
  address?: Maybe<Scalars["AddressHash"]["output"]>;
  addressInfo?: Maybe<Address>;
  affiliates?: Maybe<CeloValidatorConnection>;
  commission?: Maybe<Scalars["Wei"]["output"]>;
  lockedGold?: Maybe<Scalars["Wei"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  nonvotingLockedGold?: Maybe<Scalars["Wei"]["output"]>;
  numMembers?: Maybe<Scalars["Int"]["output"]>;
  receivableVotes?: Maybe<Scalars["Decimal"]["output"]>;
  rewardsRatio?: Maybe<Scalars["Wei"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  usd?: Maybe<Scalars["Wei"]["output"]>;
  voters?: Maybe<CeloAccountConnection>;
  votes?: Maybe<Scalars["Wei"]["output"]>;
};

/** Celo validator group information */
export type CeloValidatorGroupAffiliatesArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Celo validator group information */
export type CeloValidatorGroupVotersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type CeloValidatorGroupConnection = {
  __typename?: "CeloValidatorGroupConnection";
  edges?: Maybe<Array<Maybe<CeloValidatorGroupEdge>>>;
  pageInfo: PageInfo;
};

export type CeloValidatorGroupEdge = {
  __typename?: "CeloValidatorGroupEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CeloValidatorGroup>;
};

/** Coin balance record */
export type CoinBalance = Node & {
  __typename?: "CoinBalance";
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  blockTimestamp?: Maybe<Scalars["DateTime"]["output"]>;
  delta?: Maybe<Scalars["Wei"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  value?: Maybe<Scalars["Wei"]["output"]>;
};

export type CoinBalanceConnection = {
  __typename?: "CoinBalanceConnection";
  edges?: Maybe<Array<Maybe<CoinBalanceEdge>>>;
  pageInfo: PageInfo;
};

export type CoinBalanceEdge = {
  __typename?: "CoinBalanceEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<CoinBalance>;
};

/** Leaderboard entry */
export type Competitor = {
  __typename?: "Competitor";
  address?: Maybe<Scalars["AddressHash"]["output"]>;
  identity?: Maybe<Scalars["String"]["output"]>;
  points?: Maybe<Scalars["Float"]["output"]>;
};

/** Represents a CELO token transfer between addresses. */
export type GoldTransfer = Node & {
  __typename?: "GoldTransfer";
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  fromAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  toAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  transactionHash?: Maybe<Scalars["FullHash"]["output"]>;
  value?: Maybe<Scalars["Decimal"]["output"]>;
};

export type GoldTransferConnection = {
  __typename?: "GoldTransferConnection";
  edges?: Maybe<Array<Maybe<GoldTransferEdge>>>;
  pageInfo: PageInfo;
};

export type GoldTransferEdge = {
  __typename?: "GoldTransferEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<GoldTransfer>;
};

/** Models internal transactions. */
export type InternalTransaction = Node & {
  __typename?: "InternalTransaction";
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  callType?: Maybe<CallType>;
  createdContractAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  createdContractCode?: Maybe<Scalars["Data"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  fromAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  gas?: Maybe<Scalars["Decimal"]["output"]>;
  gasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  index?: Maybe<Scalars["Int"]["output"]>;
  init?: Maybe<Scalars["Data"]["output"]>;
  input?: Maybe<Scalars["Data"]["output"]>;
  output?: Maybe<Scalars["Data"]["output"]>;
  toAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  traceAddress?: Maybe<Scalars["Json"]["output"]>;
  transactionHash?: Maybe<Scalars["FullHash"]["output"]>;
  transactionIndex?: Maybe<Scalars["Int"]["output"]>;
  type?: Maybe<Type>;
  value?: Maybe<Scalars["Wei"]["output"]>;
};

export type InternalTransactionConnection = {
  __typename?: "InternalTransactionConnection";
  edges?: Maybe<Array<Maybe<InternalTransactionEdge>>>;
  pageInfo: PageInfo;
};

export type InternalTransactionEdge = {
  __typename?: "InternalTransactionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<InternalTransaction>;
};

export type Node = {
  /** The ID of the object. */
  id: Scalars["ID"]["output"];
};

export type PageInfo = {
  __typename?: "PageInfo";
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars["String"]["output"]>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars["Boolean"]["output"];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars["String"]["output"]>;
};

export type RootQueryType = {
  __typename?: "RootQueryType";
  /** Gets an address by hash. */
  address?: Maybe<Address>;
  /** Gets addresses by address hash. */
  addresses?: Maybe<Array<Maybe<Address>>>;
  /** Gets a block by number. */
  block?: Maybe<Block>;
  /** Gets an account by address hash. */
  celoAccount?: Maybe<CeloAccount>;
  /** Gets all the claims given a address hash. */
  celoClaims?: Maybe<Array<Maybe<CeloClaims>>>;
  /** Gets all elected validator signers. */
  celoElectedValidators?: Maybe<Array<Maybe<Address>>>;
  /** Gets Celo network parameters */
  celoParameters?: Maybe<CeloParameters>;
  /** Gets CELO and stable token transfers. */
  celoTransfers?: Maybe<CeloTransferConnection>;
  /** Gets a validator by address hash. */
  celoValidator?: Maybe<CeloValidator>;
  /** Gets a validator group by address hash. */
  celoValidatorGroup?: Maybe<CeloValidatorGroup>;
  /** Gets all validator groups. */
  celoValidatorGroups?: Maybe<Array<Maybe<CeloValidatorGroup>>>;
  /** Gets coin balances by address hash */
  coinBalances?: Maybe<CoinBalanceConnection>;
  /** Gets CELO token transfers. */
  goldTransfers?: Maybe<GoldTransferConnection>;
  /** Gets latest block number. */
  latestBlock?: Maybe<Scalars["Int"]["output"]>;
  /** Gets the leaderboard */
  leaderboard?: Maybe<Array<Maybe<Competitor>>>;
  node?: Maybe<Node>;
  /** Token transfer transactions. */
  tokenTransferTxs?: Maybe<TransferTxConnection>;
  /** Gets token transfers by token contract address hash. */
  tokenTransfers?: Maybe<TokenTransferConnection>;
  /** Gets a transaction by hash. */
  transaction?: Maybe<Transaction>;
  /** Gets CELO and stable token transfer transactions. */
  transferTxs?: Maybe<TransferTxConnection>;
};

export type RootQueryTypeAddressArgs = {
  hash: Scalars["AddressHash"]["input"];
};

export type RootQueryTypeAddressesArgs = {
  hashes: Array<Scalars["AddressHash"]["input"]>;
};

export type RootQueryTypeBlockArgs = {
  number: Scalars["Int"]["input"];
};

export type RootQueryTypeCeloAccountArgs = {
  hash: Scalars["AddressHash"]["input"];
};

export type RootQueryTypeCeloClaimsArgs = {
  hash: Scalars["AddressHash"]["input"];
  limit?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootQueryTypeCeloElectedValidatorsArgs = {
  blockNumber: Scalars["Int"]["input"];
};

export type RootQueryTypeCeloTransfersArgs = {
  addressHash?: InputMaybe<Scalars["AddressHash"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootQueryTypeCeloValidatorArgs = {
  hash: Scalars["AddressHash"]["input"];
};

export type RootQueryTypeCeloValidatorGroupArgs = {
  hash: Scalars["AddressHash"]["input"];
};

export type RootQueryTypeCoinBalancesArgs = {
  address: Scalars["AddressHash"]["input"];
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootQueryTypeGoldTransfersArgs = {
  addressHash?: InputMaybe<Scalars["AddressHash"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootQueryTypeNodeArgs = {
  id: Scalars["ID"]["input"];
};

export type RootQueryTypeTokenTransferTxsArgs = {
  addressHash?: InputMaybe<Scalars["AddressHash"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootQueryTypeTokenTransfersArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
  tokenContractAddressHash: Scalars["AddressHash"]["input"];
};

export type RootQueryTypeTransactionArgs = {
  hash: Scalars["FullHash"]["input"];
};

export type RootQueryTypeTransferTxsArgs = {
  addressHash?: InputMaybe<Scalars["AddressHash"]["input"]>;
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type RootSubscriptionType = {
  __typename?: "RootSubscriptionType";
  tokenTransfers?: Maybe<Array<Maybe<TokenTransfer>>>;
};

export type RootSubscriptionTypeTokenTransfersArgs = {
  tokenContractAddressHash: Scalars["AddressHash"]["input"];
};

/**
 * The representation of a verified Smart Contract.
 *
 * "A contract in the sense of Solidity is a collection of code (its functions)
 * and data (its state) that resides at a specific address on the Ethereum
 * blockchain."
 * http://solidity.readthedocs.io/en/v0.4.24/introduction-to-smart-contracts.html
 */
export type SmartContract = {
  __typename?: "SmartContract";
  abi?: Maybe<Scalars["Json"]["output"]>;
  addressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  compilerVersion?: Maybe<Scalars["String"]["output"]>;
  contractSourceCode?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  optimization?: Maybe<Scalars["Boolean"]["output"]>;
};

export enum SortOrder {
  Asc = "ASC",
  Desc = "DESC",
}

export enum Status {
  Error = "ERROR",
  Ok = "OK",
}

/** Represents a token transfer between addresses. */
export type TokenTransfer = Node & {
  __typename?: "TokenTransfer";
  amount?: Maybe<Scalars["Decimal"]["output"]>;
  amounts?: Maybe<Array<Maybe<Scalars["Decimal"]["output"]>>>;
  blockHash?: Maybe<Scalars["FullHash"]["output"]>;
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  comment?: Maybe<Scalars["String"]["output"]>;
  fromAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  logIndex?: Maybe<Scalars["Int"]["output"]>;
  toAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  tokenContractAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  tokenId?: Maybe<Scalars["Decimal"]["output"]>;
  tokenIds?: Maybe<Array<Maybe<Scalars["Decimal"]["output"]>>>;
  transactionHash?: Maybe<Scalars["FullHash"]["output"]>;
};

export type TokenTransferConnection = {
  __typename?: "TokenTransferConnection";
  edges?: Maybe<Array<Maybe<TokenTransferEdge>>>;
  pageInfo: PageInfo;
};

export type TokenTransferEdge = {
  __typename?: "TokenTransferEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<TokenTransfer>;
};

/** Models a Web3 transaction. */
export type Transaction = Node & {
  __typename?: "Transaction";
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  createdContractAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  cumulativeGasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  error?: Maybe<Scalars["String"]["output"]>;
  fromAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  gas?: Maybe<Scalars["Decimal"]["output"]>;
  gasPrice?: Maybe<Scalars["Wei"]["output"]>;
  gasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  hash?: Maybe<Scalars["FullHash"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  index?: Maybe<Scalars["Int"]["output"]>;
  input?: Maybe<Scalars["String"]["output"]>;
  internalTransactions?: Maybe<InternalTransactionConnection>;
  nonce?: Maybe<Scalars["NonceHash"]["output"]>;
  r?: Maybe<Scalars["Decimal"]["output"]>;
  s?: Maybe<Scalars["Decimal"]["output"]>;
  status?: Maybe<Status>;
  toAddressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  v?: Maybe<Scalars["Decimal"]["output"]>;
  value?: Maybe<Scalars["Wei"]["output"]>;
};

/** Models a Web3 transaction. */
export type TransactionInternalTransactionsArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TransactionConnection = {
  __typename?: "TransactionConnection";
  edges?: Maybe<Array<Maybe<TransactionEdge>>>;
  pageInfo: PageInfo;
};

export type TransactionEdge = {
  __typename?: "TransactionEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<Transaction>;
};

/** Represents a CELO token transfer between addresses. */
export type TransferTx = Node & {
  __typename?: "TransferTx";
  addressHash?: Maybe<Scalars["AddressHash"]["output"]>;
  blockNumber?: Maybe<Scalars["Int"]["output"]>;
  celoTransfer?: Maybe<CeloTransferConnection>;
  feeCurrency?: Maybe<Scalars["AddressHash"]["output"]>;
  feeToken?: Maybe<Scalars["String"]["output"]>;
  gasPrice?: Maybe<Scalars["Wei"]["output"]>;
  gasUsed?: Maybe<Scalars["Decimal"]["output"]>;
  gatewayFee?: Maybe<Scalars["AddressHash"]["output"]>;
  gatewayFeeRecipient?: Maybe<Scalars["AddressHash"]["output"]>;
  /** The ID of an object */
  id: Scalars["ID"]["output"];
  input?: Maybe<Scalars["String"]["output"]>;
  timestamp?: Maybe<Scalars["DateTime"]["output"]>;
  tokenTransfer?: Maybe<CeloTransferConnection>;
  transactionHash?: Maybe<Scalars["FullHash"]["output"]>;
};

/** Represents a CELO token transfer between addresses. */
export type TransferTxCeloTransferArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

/** Represents a CELO token transfer between addresses. */
export type TransferTxTokenTransferArgs = {
  after?: InputMaybe<Scalars["String"]["input"]>;
  before?: InputMaybe<Scalars["String"]["input"]>;
  count?: InputMaybe<Scalars["Int"]["input"]>;
  first?: InputMaybe<Scalars["Int"]["input"]>;
  last?: InputMaybe<Scalars["Int"]["input"]>;
};

export type TransferTxConnection = {
  __typename?: "TransferTxConnection";
  edges?: Maybe<Array<Maybe<TransferTxEdge>>>;
  pageInfo: PageInfo;
};

export type TransferTxEdge = {
  __typename?: "TransferTxEdge";
  cursor?: Maybe<Scalars["String"]["output"]>;
  node?: Maybe<TransferTx>;
};

export enum Type {
  Call = "CALL",
  Create = "CREATE",
  Reward = "REWARD",
  Selfdestruct = "SELFDESTRUCT",
}

export type GetContractsInfoQueryVariables = Exact<{
  addresses:
    | Array<Scalars["AddressHash"]["input"]>
    | Scalars["AddressHash"]["input"];
}>;

export type GetContractsInfoQuery = {
  __typename?: "RootQueryType";
  addresses?: Array<{
    __typename?: "Address";
    hash?: any | null;
    smartContract?: {
      __typename?: "SmartContract";
      name?: string | null;
      abi?: any | null;
    } | null;
  } | null> | null;
};

export const GetContractsInfoDocument = gql`
  query getContractsInfo($addresses: [AddressHash!]!) {
    addresses(hashes: $addresses) {
      hash
      smartContract {
        name
        abi
      }
    }
  }
`;

/**
 * __useGetContractsInfoQuery__
 *
 * To run a query within a React component, call `useGetContractsInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsInfoQuery({
 *   variables: {
 *      addresses: // value for 'addresses'
 *   },
 * });
 */
export function useGetContractsInfoQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetContractsInfoQuery,
    GetContractsInfoQueryVariables
  > &
    (
      | { variables: GetContractsInfoQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetContractsInfoQuery, GetContractsInfoQueryVariables>(
    GetContractsInfoDocument,
    options,
  );
}
export function useGetContractsInfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetContractsInfoQuery,
    GetContractsInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetContractsInfoQuery,
    GetContractsInfoQueryVariables
  >(GetContractsInfoDocument, options);
}
export function useGetContractsInfoSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<
    GetContractsInfoQuery,
    GetContractsInfoQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<
    GetContractsInfoQuery,
    GetContractsInfoQueryVariables
  >(GetContractsInfoDocument, options);
}
export type GetContractsInfoQueryHookResult = ReturnType<
  typeof useGetContractsInfoQuery
>;
export type GetContractsInfoLazyQueryHookResult = ReturnType<
  typeof useGetContractsInfoLazyQuery
>;
export type GetContractsInfoSuspenseQueryHookResult = ReturnType<
  typeof useGetContractsInfoSuspenseQuery
>;
export type GetContractsInfoQueryResult = Apollo.QueryResult<
  GetContractsInfoQuery,
  GetContractsInfoQueryVariables
>;
