import { BadgeType } from "@/lib/types";
import { ProposalState } from "@/lib/graphql";

export const stateToBadgeColorMap: Record<ProposalState, BadgeType> = {
  [ProposalState.Active]: "primary",
  [ProposalState.Pending]: "secondary",
  [ProposalState.Executed]: "success",
  [ProposalState.Defeated]: "danger",
  [ProposalState.Canceled]: "warning",
  [ProposalState.Expired]: "warning",
  [ProposalState.NoState]: "info",
  [ProposalState.Queued]: "primary",
  [ProposalState.Succeeded]: "success",
};
