import { Proposal, ProposalState } from "@/lib/graphql";
import React from "react";
import { format, fromUnixTime } from "date-fns";
import { BlockExplorerLink, CardHeader } from "@mento-protocol/ui-toolkit";

const StatusMessage = {
  Layout: ({ children }: { children: React.ReactNode }) => (
    <div className="flex min-h-[163px] flex-col justify-between space-y-4 font-fg text-[22px]/none">
      <div className="flex-grow" />
      {children}
      <div className="flex-grow" />
    </div>
  ),
  Header: ({ children }: { children: React.ReactNode }) => (
    <CardHeader className="text-center">
      <h2 className="font-fg text-[32px]/none font-medium">{children}</h2>
    </CardHeader>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <span>{children}</span>
  ),
};

const ExploreLaterMessage: React.FC = () => (
  <StatusMessage.Content>
    Please explore other proposals to participate in the Mento ecosystem!
  </StatusMessage.Content>
);

const getProposalStatusContent = (proposal: Proposal) => {
  const baseMessages: Record<
    Exclude<ProposalState, ProposalState.Active>,
    React.ReactNode
  > = {
    [ProposalState.Succeeded]: (
      <>
        <StatusMessage.Header>Proposal Succeeded</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal has succeeded.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.Defeated]: (
      <>
        <StatusMessage.Header>Proposal Defeated</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal was defeated.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.Pending]: (
      <>
        <StatusMessage.Header>Proposal Pending</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal is currently pending.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.Canceled]: (
      <>
        <StatusMessage.Header>Proposal Canceled</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal was canceled.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.Executed]: (
      <>
        {proposal.proposalExecuted.length > 0 && (
          <>
            <StatusMessage.Header>Proposal Executed</StatusMessage.Header>
            <StatusMessage.Layout>
              <StatusMessage.Content>
                {(() => {
                  const [
                    {
                      transaction: { id: hash, timestamp },
                    },
                  ] = proposal.proposalExecuted;
                  const executionDate = fromUnixTime(timestamp);
                  const formattedDate = format(
                    executionDate,
                    "MMMM do, yyyy 'at' hh:mm a",
                  );
                  return (
                    <div className="flex flex-col gap-2">
                      <span className="text-center">{`Successfully executed on`}</span>
                      <span className="text-center">{formattedDate}</span>
                      <BlockExplorerLink
                        className="mb-2 mt-2 text-center text-base"
                        type="tx"
                        item={hash}
                      >
                        View on explorer
                      </BlockExplorerLink>
                    </div>
                  );
                })()}
              </StatusMessage.Content>
              <ExploreLaterMessage />
            </StatusMessage.Layout>
          </>
        )}
      </>
    ),
    [ProposalState.Expired]: (
      <>
        <StatusMessage.Header>Proposal Expired</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal has expired.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.Queued]: (
      <>
        <StatusMessage.Header>Proposal Queued</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal is queued.
          </StatusMessage.Content>
          <ExploreLaterMessage />
          {proposal.eta && (
            <StatusMessage.Content>
              This proposal will be executable after{" "}
              {new Date(proposal.eta * 1000).toLocaleString()}.
            </StatusMessage.Content>
          )}
        </StatusMessage.Layout>
      </>
    ),
    [ProposalState.NoState]: (
      <>
        <StatusMessage.Header>Proposal Pending</StatusMessage.Header>
        <StatusMessage.Layout>
          <StatusMessage.Content>
            This proposal is currently pending.
          </StatusMessage.Content>
          <ExploreLaterMessage />
        </StatusMessage.Layout>
      </>
    ),
  };

  return baseMessages[
    proposal.state as Exclude<ProposalState, ProposalState.Active>
  ];
};

export const ProposalStatusMessage = ({ proposal }: { proposal: Proposal }) => {
  return getProposalStatusContent(proposal);
};
