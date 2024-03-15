import LoadingState from "@/app/components/_shared/vote-loading-state/vote-loading-state";
import CastVote from "@/app/components/vote-cast-vote/cast-vote";
import InactiveProposalStatusMessage from "@/app/components/vote-inactive-proposal-status-message/inactive-proposal-status-message";
import { Proposal, ProposalState } from "@/app/graphql";

export default function Vote({ proposal }: { proposal: Proposal }) {
  if (proposal && proposal.state === ProposalState.NoState) {
    return <LoadingState />;
  }

  if (proposal.state === ProposalState.Active) {
    return <CastVote proposalId={proposal.proposalId} />;
  }

  return <InactiveProposalStatusMessage proposalState={proposal.state} />;
}
