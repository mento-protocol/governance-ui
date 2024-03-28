"use client";
import { Suspense, useMemo } from "react";
import { useBlock, useBlockNumber } from "wagmi";
import { format } from "date-fns";

// Components

import Participants from "./_components/participants.component";
import Vote from "./_components/vote.component";
import {
  Avatar,
  ExecutionCodeView,
  Loader,
  MarkdownView,
  Status,
  WalletAddressWithCopy,
} from "@/components/_shared";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { Countdown } from "@/components/countdown/countdown.component";
import BlockExplorerLink from "@/components/_shared/block-explorer-link/block-explorer-link.component";
import { ProposalCurrentVotes } from "@/components/proposal-current-votes/proposal-current-votes.component";
import useProposal from "@/lib/contracts/governor/useProposal";

const Page = ({ params }: { params: { id: string } }) => {
  // TODO: return loading states
  const { proposal } = useProposal(BigInt(params.id));
  const currentBlock = useBlockNumber();

  const endBlock = useBlock({
    blockNumber: BigInt(proposal?.endBlock),
    query: {
      enabled: proposal !== undefined,
    },
  });

  // There should really ever be 1 ProposalCreated event per proposal so we just take the first one
  const proposedOn = useMemo(() => {
    return proposal && new Date(proposal.proposalCreated[0].timestamp * 1000);
  }, [proposal]);

  const votingDeadline = useMemo(() => {
    const CELO_BLOCK_TIME = 5000; // 5 seconds

    if (proposal && currentBlock.data) {
      // If the end block is already mined, we can fetch the timestamp
      if (Number(currentBlock.data) >= proposal.endBlock && endBlock.data) {
        return new Date(Number(endBlock.data.timestamp) * 1000);
      } else {
        // If the end block is not mined yet, we estimate the time
        return new Date(
          Date.now() +
            // Estimation of ~5 seconds per block
            (proposal.endBlock - Number(currentBlock.data)) * CELO_BLOCK_TIME,
        );
      }
    }
  }, [currentBlock.data, endBlock.data, proposal]);

  return (
    <main className="flex flex-col">
      {!proposal && <div>Proposal not found</div>}
      {proposal && (
        <>
          <div className="mb-x4 mt-x6">
            <Status
              text={proposal.state.toString()}
              type={stateToStatusColorMap[proposal.state]}
            />
          </div>
          <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
              <h1 className="text-xl md:font-size-x11 md:line-height-x11 font-medium">
                {proposal.metadata.title}
              </h1>
            </div>
            <div className="md:col-start-5 md:col-span-3">
              {proposal.state === "Active" && votingDeadline && (
                <Countdown
                  endTimestamp={votingDeadline.getTime()}
                  updateIntervalInMs={1000}
                />
              )}
            </div>
          </div>
          <div className="flex flex-wrap place-items-center justify-start mt-8 gap-x6 ">
            <div className="flex place-items-center gap-x2">
              <Suspense fallback={<Loader isCenter />}>
                <Avatar address={proposal.proposer.id} />
                by{" "}
                <span className="font-medium">
                  <WalletAddressWithCopy address={proposal.proposer.id} />
                </span>
              </Suspense>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Proposed on:</span>
              <span className="font-medium">
                <Suspense fallback={<Loader isCenter />}>
                  {proposedOn && (
                    <BlockExplorerLink type="block" item={proposal.startBlock}>
                      {format(proposedOn, "MMMM do, yyyy 'at' hh:mm a")}
                    </BlockExplorerLink>
                  )}
                </Suspense>
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Voting deadline:</span>
              <span className="font-medium">
                {votingDeadline && (
                  <BlockExplorerLink type="block" item={proposal.endBlock}>
                    {format(votingDeadline, "MMMM do, yyyy 'at' hh:mm a")}{" "}
                  </BlockExplorerLink>
                )}
              </span>
            </div>
          </div>
          <div className="mt-x6 flex flex-col md:flex-row md:justify-between place-items-start gap-x6 md:gap-x1">
            <div className="flex-1 max-w-2xl w-full">
              <ProposalCurrentVotes className="md:mb-x6" />
              <div className="md:hidden my-x6">
                <Vote proposal={proposal} />
              </div>
              <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
                Description
              </h3>
              <MarkdownView markdown={proposal.metadata.description} />
              {proposal.calls && <ExecutionCodeView code={proposal.calls} />}
            </div>
            <div className="md:max-w-[350px] flex flex-col gap-x11">
              <div className="hidden md:block">
                <Vote proposal={proposal} />
              </div>
              <Participants votes={proposal.votes} />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
