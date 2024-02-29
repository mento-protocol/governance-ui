import {
  GetProposalDocument as GetProposal,
  GetProposalsDocument as GetProposals,
} from "./subgraph/generated/graphql";

export * from "./subgraph/generated";
export * from "./subgraph/generated/graphql";

// We can't blindly export ALL generated types from the celo-explorer schema
// because some of them conflict with the subgraph schema. So we need to pick
// only the ones we need
import {
  GetContractsInfoDocument as GetContractsInfo,
  GetContractsInfoQuery,
} from "./celo-explorer/generated/graphql";

export { GetContractsInfo, GetProposal, GetProposals };
export type { GetContractsInfoQuery };
