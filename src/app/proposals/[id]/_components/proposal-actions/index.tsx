import { ProposalStatusMessage } from "./proposal-status-message";
import { Vote } from "./vote/vote.component";
import { Proposal, ProposalState } from "@/lib/graphql";
import { DisconnectedState } from "./disconnected-state";
import Queue from "./queue";
import { useAccount } from "wagmi";
import { ProposalActionLoading } from "./proposal-action-loading";
import { Card } from "@/components/_shared";

const ProposalAction = ({ proposal }: { proposal: Proposal }) => {
  const { isDisconnected } = useAccount();

  if (isDisconnected) {
    return <DisconnectedState />;
  }

  if (!proposal || proposal.state === ProposalState.NoState) {
    return <ProposalActionLoading />;
  }

  let actionComponent;

  switch (proposal.state) {
    case ProposalState.Active:
      actionComponent = <Vote proposalId={proposal.proposalId} />;
      break;
    case ProposalState.Succeeded:
      actionComponent = <Queue proposalId={proposal.proposalId} />;
      break;
    // case ProposalState.Queued:
    //   actionComponent =  <ExecuteProposal proposalId={proposal.proposalId} />;
    default:
      actionComponent = (
        <ProposalStatusMessage proposalState={proposal.state} />
      );
  }

  return (
    <Card className="min-h-[320px] font-fg text-[22px]/none">
      {actionComponent}
    </Card>
  );
};

export default ProposalAction;
