"use client";
import { Suspense, useMemo } from "react";
import { useAccount, useBlock, useBlockNumber } from "wagmi";
import { format } from "date-fns";

// Components
import useProposal from "@/lib/contracts/governor/useProposal";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import {
  Avatar,
  BlockExplorerLink,
  Loader,
  MarkdownView,
  Status,
  WalletAddressWithCopy,
} from "@/components/_shared";
import ProposalActions from "./_components/proposal-actions";
import ExecutionCode from "./_components/execution-code.component";
import Participants from "./_components/participants.component";
import { Countdown, ProposalCurrentVotes } from "@/components/index";
import { ensureChainId } from "@/lib/helpers/ensureChainId";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { proposal } = useProposal(BigInt(id));
  const { chainId } = useAccount();

  const { data: currentBlock } = useBlockNumber({
    watch: true,
    chainId: ensureChainId(chainId),
  });

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

    if (proposal && currentBlock) {
      // If the end block is already mined, we can fetch the timestamp
      if (Number(currentBlock) >= proposal.endBlock && endBlock.data) {
        return new Date(Number(endBlock.data.timestamp) * 1000);
      } else {
        // If the end block is not mined yet, we estimate the time
        return new Date(
          Date.now() +
            // Estimation of ~5 seconds per block
            (proposal.endBlock - Number(currentBlock)) * CELO_BLOCK_TIME,
        );
      }
    }
  }, [currentBlock, endBlock.data, proposal]);

  const timeLockDeadLine = useMemo(() => {
    if (proposal && proposal.state === "Queued" && proposal.proposalQueued[0]) {
      return new Date(Number(proposal.proposalQueued[0].eta) * 1000);
    }
  }, [proposal]);

  return (
    <main className="flex flex-col">
      {!proposal && <div>Proposal not found</div>}
      {proposal && (
        <>
          <div className="mb-4 mt-6">
            <Status
              text={proposal.state.toString()}
              type={stateToStatusColorMap[proposal.state]}
            />
          </div>
          <div className="flex flex-col gap-x1 md:grid md:grid-cols-7">
            <div className="md:col-span-4 md:col-start-1">
              <h1 className="text-[56px]/none font-medium">
                <Suspense fallback={<Loader isCenter />}>
                  {proposal.metadata?.title}
                </Suspense>
              </h1>
            </div>
            <div className="md:col-span-3 md:col-start-5">
              {timeLockDeadLine &&
                timeLockDeadLine.getTime() >= new Date().getTime() && (
                  <Countdown
                    endTimestamp={timeLockDeadLine.getTime()}
                    updateIntervalInMs={1000}
                  />
                )}
              {proposal.state === "Active" && votingDeadline && (
                <Countdown
                  endTimestamp={votingDeadline.getTime()}
                  updateIntervalInMs={1000}
                />
              )}
            </div>
          </div>
          <div className="mt-12 flex flex-wrap place-items-center justify-start gap-x6 font-inter ">
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
              <span className="font-light">Proposed on:</span>
              <span className="">
                <Suspense fallback={<Loader isCenter />}>
                  {proposedOn && (
                    <BlockExplorerLink
                      className=" no-underline "
                      type="block"
                      item={proposal.startBlock}
                    >
                      {format(proposedOn, "MMMM do, yyyy 'at' hh:mm a")}
                    </BlockExplorerLink>
                  )}
                </Suspense>
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span className="font-light">Voting deadline:</span>
              <span className="">
                {votingDeadline && (
                  <BlockExplorerLink
                    className=" no-underline"
                    type="block"
                    item={proposal.endBlock}
                  >
                    {format(votingDeadline, "MMMM do, yyyy 'at' hh:mm a")}{" "}
                  </BlockExplorerLink>
                )}
              </span>
            </div>
          </div>
          <div className="mt-14 flex flex-col place-items-start gap-y-16 md:flex-row md:justify-between md:gap-1">
            <div className="w-full max-w-2xl flex-1">
              {proposal.votes ? (
                <ProposalCurrentVotes
                  proposal={proposal}
                  className="md:mb-x6"
                />
              ) : (
                <Loader isCenter />
              )}
              <div className="my-x6 md:hidden">
                <ProposalActions proposal={proposal} />
              </div>
              <h3 className="my-8 flex justify-center text-3xl font-medium">
                Proposal Description
              </h3>
              <Suspense fallback={<Loader isCenter />}>
                <MarkdownView markdown={proposal.metadata?.description} />
              </Suspense>
              {proposal.calls && <ExecutionCode calls={proposal.calls} />}
            </div>
            <div className="flex flex-col gap-x11 md:max-w-[350px]">
              <div className="hidden md:block">
                <ProposalActions proposal={proposal} />
              </div>
              {proposal.votes && <Participants votes={proposal.votes} />}
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
