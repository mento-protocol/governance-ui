import { useAccount } from "wagmi";
import { Proposal, ProposalState } from "@/lib/graphql";
import { DisconnectedState } from "./disconnected-state";
import { ProposalActionLoading } from "./proposal-action-loading";
import ExecuteProposal from "./execute";
import QueueProposal from "./queue";
import Vote from "./vote";
import { ProposalStatusMessage } from "./proposal-status-message.component";
import { Card } from "@mento-protocol/ui-toolkit";

const ProposalActions = ({
  proposal,
  isLoading,
}: {
  proposal: Proposal;
  isLoading: boolean;
}) => {
  const { address, isConnecting, isReconnecting } = useAccount();

  if (isConnecting || isReconnecting || isLoading) {
    return <ProposalActionLoading />;
  }

  if (
    !address &&
    !(
      proposal.state !== ProposalState.Active &&
      proposal.state !== ProposalState.Queued
    )
  ) {
    return <DisconnectedState />;
  }

  const Component = getComponent(proposal.state);

  return (
    <Card className="min-h-[260px] p-4">
      <Component proposal={proposal} />
    </Card>
  );
};

const getComponent = (state: ProposalState) => {
  switch (state) {
    case ProposalState.Active:
      return Vote;
    case ProposalState.Succeeded:
      return QueueProposal;
    case ProposalState.Queued:
      return ExecuteProposal;
    default:
      return ProposalStatusMessage;
  }
};

export default ProposalActions;
