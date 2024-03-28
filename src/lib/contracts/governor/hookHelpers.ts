import { ProposalState } from "@/lib/graphql/subgraph/generated/subgraph";

export type StateNumber = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export const STATE_FROM_NUMBER: Record<StateNumber, ProposalState> = {
  0: ProposalState.Pending,
  1: ProposalState.Active,
  2: ProposalState.Canceled,
  3: ProposalState.Defeated,
  4: ProposalState.Succeeded,
  5: ProposalState.Queued,
  6: ProposalState.Expired,
  7: ProposalState.Executed,
};

export const isStateNumber = (value: any): value is StateNumber => {
  return value && typeof value === "number" && value >= 0 && value <= 7;
};
