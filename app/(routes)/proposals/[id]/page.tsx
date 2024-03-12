"use client";
import { GetProposal, Proposal, ProposalState } from "@/app/graphql";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import classNames from "classnames";
import { format } from "date-fns";
import { useMemo } from "react";
import { useBlock, useBlockNumber, useChainId } from "wagmi";
import styles from "./page.module.scss";

// Components
import BlockExplorerLink from "@/app/components/_shared/block-explorer-link/block-explorer-link.component";
import { MarkdownView } from "@/app/components/_shared/markdown-view/markdown-view.component";
import { Countdown } from "@/app/components/countdown/countdown.component";
import { Avatar, Badge, WalletAddressWithCopy } from "@components/_shared";
import { ProposalCurrentVotes } from "@components/proposal-current-votes/proposal-current-votes.component";
import { stateToBadgeColorMap } from "@interfaces/proposal.interface";
import ExecutionCode from "./_components/execution-code.component";
import Participants from "./_components/participants.component";
import Vote from "./_components/vote.component";

const Page = ({ params }: { params: { id: string } }) => {
  const chainId = useChainId();

  /**
   * FIXME: The return type definition is a bit hacky and ideally shouldn't be needed.
   * It's likely fragments-related. If we inline the ProposalFields fragment into the
   * GetProposal query, then it works without an explicit return type definition 🤷‍♂️
   */
  const { data } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposal, {
    variables: { id: params.id },
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
  });

  useProposalStates(data.proposals);

  const proposal = data.proposals[0];

  const { title, description } = proposal.metadata;
  const currentBlock = useBlockNumber();
  const endBlock = useBlock({ blockNumber: BigInt(proposal.endBlock) });
  const proposerId = proposal.proposer?.id;
  const status = proposal.state?.toString();
  // There should really ever be 1 ProposalCreated event per proposal so we just take the first one
  const proposedOn = new Date(proposal.proposalCreated[0].timestamp * 1000);

  const votingDeadline = useMemo(() => {
    const CELO_BLOCK_TIME = 5000; // 5 seconds

    if (currentBlock.data) {
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
  }, [currentBlock, endBlock, proposal.endBlock]);

  return (
    <main className="flex flex-col">
      {!proposal && <div>Proposal not found</div>}
      {proposal && (
        <>
          <Badge
            className="uppercase mt-x6 mb-3 font-medium"
            type={stateToBadgeColorMap[proposal.state as ProposalState]}
          >
            {status}
          </Badge>
          <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
              <h1 className="text-xl md:font-size-x11 md:line-height-x11 font-medium">
                {title}
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
              <Avatar address={proposerId} />
              by{" "}
              <span className="font-medium">
                <WalletAddressWithCopy address={proposerId} />
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Proposed on:</span>
              <span className="font-medium">
                <BlockExplorerLink type="block" item={proposal.startBlock}>
                  {format(proposedOn, "MMMM do, yyyy 'at' hh:mm a")}
                </BlockExplorerLink>
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
            <div className={classNames(styles.details, "flex-1")}>
              <ProposalCurrentVotes className="md:mb-x6" />
              <div className="md:hidden my-x6">
                <Vote proposal={proposal} />
              </div>
              <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
                Description
              </h3>
              <MarkdownView markdown={description} />
              <ExecutionCode calls={proposal.calls} />
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
