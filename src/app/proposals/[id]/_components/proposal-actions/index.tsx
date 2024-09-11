import { useAccount } from "wagmi";
import { Proposal, ProposalState } from "@/lib/graphql";
import { DisconnectedState } from "./disconnected-state";
import { ProposalActionLoading } from "./proposal-action-loading";
import { Card } from "@/components/_shared";
import ExecuteProposal from "./execute";
import QueueProposal from "./queue";
import Vote from "./vote";
import { ProposalStatusMessage } from "./proposal-status-message.component";

const ProposalActions = ({ proposal }: { proposal: Proposal }) => {
  const { address } = useAccount();

  if (!address) {
    return <DisconnectedState />;
  }

  if (!proposal) {
    return <ProposalActionLoading />;
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
