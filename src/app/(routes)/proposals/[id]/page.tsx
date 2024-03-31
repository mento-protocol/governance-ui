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
          <div className="gap-x1 flex flex-col md:grid md:grid-cols-7 ">
            <div className="md:col-span-4 md:col-start-1">
              <h1 className="md:font-size-x11 md:line-height-x11 text-xl font-medium">
                {proposal.metadata.title}
              </h1>
            </div>
            <div className="md:col-span-3 md:col-start-5">
              {proposal.state === "Active" && votingDeadline && (
                <Countdown
                  endTimestamp={votingDeadline.getTime()}
                  updateIntervalInMs={1000}
                />
              )}
            </div>
          </div>
          <div className="gap-x6 mt-8 flex flex-wrap place-items-center justify-start ">
            <div className="gap-x2 flex place-items-center">
              <Suspense fallback={<Loader isCenter />}>
                <Avatar address={proposal.proposer.id} />
                by{" "}
                <span className="font-medium">
                  <WalletAddressWithCopy address={proposal.proposer.id} />
                </span>
              </Suspense>
            </div>
            <div className="gap-x2 flex place-items-center">
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
            <div className="gap-x2 flex place-items-center">
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
          <div className="mt-x6 gap-x6 md:gap-x1 flex flex-col place-items-start md:flex-row md:justify-between">
            <div className="w-full max-w-2xl flex-1">
              <ProposalCurrentVotes className="md:mb-x6" />
              <div className="my-x6 md:hidden">
                <Vote proposal={proposal} />
              </div>
              <h3 className="font-size-x6 line-height-x6 mb-x6 flex justify-center font-medium">
                Description
              </h3>
              <MarkdownView markdown={proposal.metadata.description} />
              {proposal.calls && <ExecutionCodeView code={proposal.calls} />}
            </div>
            <div className="gap-x11 flex flex-col md:max-w-[350px]">
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
