import {
  GetProposalDocument as GetProposal,
  GetProposalsDocument as GetProposals,
  GetAllLocksDocument as GetAllLocks,
} from "./subgraph/generated/subgraph";

export * from "./subgraph/generated/subgraph";

// We can't blindly export ALL generated types from the celo-explorer schema
// because some of them conflict with the subgraph schema. So we need to pick
// only the ones we need
import {
  GetContractsInfoDocument as GetContractsInfo,
  GetContractsInfoQuery,
} from "./celo-explorer/generated/celoGraph";

export { GetContractsInfo, GetProposal, GetProposals, GetAllLocks };
export type { GetContractsInfoQuery };
