import { LoadingState } from "@/components/_shared";
import { CastVote, InactiveProposalStatusMessage } from "@/components/index";
import { Proposal, ProposalState } from "@/lib/graphql";

export default function Vote({ proposal }: { proposal: Proposal }) {
  if (proposal && proposal.state === ProposalState.NoState) {
    return <LoadingState />;
  }

  if (proposal.state === ProposalState.Active) {
    return <CastVote proposalId={proposal.proposalId} />;
  }

  return <InactiveProposalStatusMessage proposalState={proposal.state} />;
}
