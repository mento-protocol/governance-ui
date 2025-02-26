"use client";
import { Suspense, useMemo } from "react";
import { useAccount, useBlock, useBlockNumber } from "wagmi";
import { format } from "date-fns";

// Components
import useProposal from "@/lib/contracts/governor/useProposal";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import {
  MarkdownView,
  Status,
  WalletAddressWithCopy,
} from "@/components/_shared";
import ProposalActions from "./_components/proposal-actions";
import ExecutionCode from "./_components/execution-code.component";
import Participants from "./_components/participants.component";
import { Countdown, ProposalCurrentVotes } from "@/components/index";
import { ensureChainId } from "@/lib/helpers/ensureChainId";
import { Proposal, ProposalState } from "@/lib/graphql";
import { CELO_BLOCK_TIME } from "@/config/config.constants";
import { Avatar, BlockExplorerLink, Card, Loader } from "@mento-protocol/ui-toolkit";

const ProposalCountdown = ({ proposal }: { proposal: Proposal }) => {
  const { data: currentBlock } = useBlockNumber({
    watch: true,
    chainId: ensureChainId(useAccount().chainId),
  });

  const endBlock = useBlock({
    blockNumber: proposal.endBlock ? BigInt(proposal.endBlock) : 0n,
    query: {
      enabled: true,
    },
  });

  const votingDeadline = useMemo(() => {
    if (currentBlock) {
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
  }, [currentBlock, endBlock.data, proposal.endBlock]);

  const timeLockDeadLine = useMemo(() => {
    if (proposal.state === ProposalState.Queued && proposal.proposalQueued[0]) {
      return new Date(Number(proposal.proposalQueued[0].eta) * 1000);
    }
  }, [proposal]);

  if (timeLockDeadLine && timeLockDeadLine.getTime() >= new Date().getTime()) {
    return (
      <Countdown
        endTimestamp={timeLockDeadLine.getTime()}
        updateIntervalInMs={1000}
      />
    );
  }

  if (proposal.state === ProposalState.Active && votingDeadline) {
    return (
      <Countdown
        endTimestamp={votingDeadline.getTime()}
        updateIntervalInMs={1000}
      />
    );
  }

  return null;
};

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const { proposal, isLoading } = useProposal(id ? BigInt(id) : 0n);
  const { chainId } = useAccount();

  const { data: currentBlock } = useBlockNumber({
    chainId: ensureChainId(chainId),
    query: {
      enabled: proposal !== undefined,
      refetchInterval: CELO_BLOCK_TIME,
    },
  });

  const endBlock = useBlock({
    blockNumber: proposal?.endBlock ? BigInt(proposal.endBlock) : 0n,
    query: {
      enabled: proposal !== undefined,
    },
  });

  // There should really ever be 1 ProposalCreated event per proposal so we just take the first one
  const proposedOn = useMemo(() => {
    return proposal && new Date(proposal.proposalCreated[0].timestamp * 1000);
  }, [proposal]);

  const votingDeadline = useMemo(() => {
    if (!(proposal && currentBlock)) return;
    // If the end block is already mined, we can fetch the timestamp
    if (Number(currentBlock) >= proposal.endBlock && endBlock.data) {
      return new Date(Number(endBlock.data.timestamp) * 1000);
    }
    // If the end block is not mined yet, we estimate the time
    return new Date(
      Date.now() +
        // Estimation of ~5 seconds per block
        (proposal.endBlock - Number(currentBlock)) * CELO_BLOCK_TIME,
    );
  }, [currentBlock, endBlock.data, proposal]);

  const timeLockDeadLine = useMemo(() => {
    if (
      proposal &&
      proposal.state === ProposalState.Queued &&
      proposal.proposalQueued[0]
    ) {
      return new Date(Number(proposal.proposalQueued[0].eta) * 1000);
    }
  }, [proposal]);

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <>
      <main className="flex flex-col gap-8 pt-8 md:hidden">
        <Card>
          <div className="flex flex-col items-start">
            <Status
              text={proposal.state.toString()}
              type={stateToStatusColorMap[proposal.state]}
            />
            <h1 className="mb-4 mt-2 text-[32px]/none font-medium">
              {proposal.metadata?.title}
            </h1>
            <ProposalCountdown proposal={proposal} />
          </div>
          <div className="flex flex-col gap-4 pt-6">
            <div className="flex place-items-center gap-x2 font-inter">
              <Avatar address={proposal.proposer.id} />
              by{" "}
              <span className="font-medium">
                <WalletAddressWithCopy address={proposal.proposer.id} />
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter">Proposed on:</span>
              <span className="font-inter font-medium">
                {proposedOn && (
                  <BlockExplorerLink
                    className=" no-underline "
                    type="block"
                    item={proposal.startBlock}
                  >
                    {format(proposedOn, "MMMM do, yyyy")}
                  </BlockExplorerLink>
                )}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-inter">Voting deadline:</span>
              <span className="font-inter font-medium">
                {votingDeadline && (
                  <BlockExplorerLink
                    className=" no-underline"
                    type="block"
                    item={proposal.endBlock}
                  >
                    {format(votingDeadline, "MMMM do, yyyy")}{" "}
                  </BlockExplorerLink>
                )}
              </span>
            </div>
          </div>
        </Card>
        {proposal.votes ? (
          <ProposalCurrentVotes proposal={proposal} className="md:mb-x6" />
        ) : (
          <Loader isCenter />
        )}
        <ProposalActions proposal={proposal} isLoading={isLoading} />
        <Suspense fallback={<Loader isCenter />}>
          <Card className="flex flex-col gap-6">
            <h2 className="text-center text-[32px]/none font-medium">
              Proposal Description
            </h2>
            <MarkdownView markdown={proposal.metadata?.description} />
          </Card>
        </Suspense>
        {proposal.calls && <ExecutionCode calls={proposal.calls} />}
        {proposal.votes && <Participants votes={proposal.votes} />}
      </main>

      <main className="hidden md:flex md:flex-col">
        <div className="mb-4 mt-6 flex items-center justify-between">
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
            <div className="hidden lg:flex">
              {timeLockDeadLine &&
                timeLockDeadLine.getTime() >= new Date().getTime() && (
                  <Countdown
                    endTimestamp={timeLockDeadLine.getTime()}
                    updateIntervalInMs={1000}
                  />
                )}
            </div>
            {proposal.state === ProposalState.Active && votingDeadline && (
              <Countdown
                endTimestamp={votingDeadline.getTime()}
                updateIntervalInMs={1000}
              />
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap place-items-center justify-start gap-x6 font-inter lg:mt-12 ">
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
                    className="no-underline"
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
              <ProposalCurrentVotes proposal={proposal} className="md:mb-x6" />
            ) : (
              <Loader isCenter />
            )}
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
              <ProposalActions proposal={proposal} isLoading={isLoading} />
            </div>
            {proposal.votes && <Participants votes={proposal.votes} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
