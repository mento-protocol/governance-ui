"use client";
import { GetProposal, Proposal, ProposalState } from "@/app/graphql";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useUserStore } from "@/app/store";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import {
  UseBlockNumberReturnType,
  UseBlockReturnType,
  useBlock,
  useBlockNumber,
} from "wagmi";
import styles from "./page.module.scss";

// Components
import BlockExplorerLink from "@/app/components/_shared/block-explorer-link/block-explorer-link.component";
import { MarkdownView } from "@/app/components/_shared/markdown-view/markdown-view.component";
import {
  Avatar,
  Badge,
  Button,
  WalletAddressWithCopy,
} from "@components/_shared";
import { ProposalCurrentVotes } from "@components/proposal-current-votes/proposal-current-votes.component";
import { stateToBadgeColorMap } from "@interfaces/proposal.interface";
import ExecutionCode from "./_components/execution-code.component";
import Participants from "./_components/participants.component";
import Vote from "./_components/vote.component";

const Page = ({ params }: { params: { id: string } }) => {
  const { walletAddress, balanceVeMENTO } = useUserStore();

  // FIXME: The return type definition is a bit hacky and ideally shouldn't be needed.
  // It's likely fragments-related. If we inline the ProposalFields fragment into GetProposal,
  // then it works without explicit return type definition 🤷‍♂️
  const { data } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposal, {
    variables: { id: params.id },
  });

  useProposalStates(data.proposals);

  const [mobileVotingModalActive, setMobileVotingModalActive] = useState(false);
  const [mobileParticipantsModalActive, setMobileParticipantsModelActive] =
    useState(false);

  const proposal = data.proposals[0];
  const { title, description } = proposal.metadata;
  const currentBlock = useBlockNumber();
  const endBlock = useBlock({ blockNumber: BigInt(proposal.endBlock) });
  const proposerId = proposal.proposer?.id;
  const status = proposal.state?.toString();
  // There should really ever be 1 ProposalCreated event per proposal so we just take the first one
  const proposedOn = new Date(proposal.proposalCreated[0].timestamp * 1000);
  const votingDeadline = getEndBlockTime(proposal, currentBlock, endBlock);

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
              {/* TODO: Reactivate once the Countdown bug with 'Maximum update depth exceeded' is fixed */}
              {/* {votingDeadline && (
                <Countdown countDownMilliseconds={1000} end={votingDeadline} />
              )} */}
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
          <div className="mt-x6 flex flex-col md:flex-row md:justify-between place-items-start gap-x1 ">
            <div className={classNames(styles.details, "flex-1")}>
              <ProposalCurrentVotes className="mb-x6" />
              <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
                Description
              </h3>
              <MarkdownView markdown={description} />
              <ExecutionCode calls={proposal.calls} />
            </div>
            <div className={styles.proposal_addons}>
              <div className={classNames(styles.mobile_controls)}>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  disabled={!walletAddress}
                  className={styles.mobile_button}
                  theme="primary"
                  onClick={() => setMobileVotingModalActive(true)}
                >
                  Vote
                </Button>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  className={styles.mobile_button}
                  theme="secondary"
                  onClick={() => setMobileParticipantsModelActive(true)}
                >
                  Participants
                </Button>
              </div>
              {proposal.state === "Active" && (
                <Vote
                  balanceVeMENTO={balanceVeMENTO}
                  setVotingModalActive={setMobileVotingModalActive}
                  votingModalActive={mobileVotingModalActive}
                  walletAddress={walletAddress}
                />
              )}
              <Participants
                participantsModalActive={mobileParticipantsModalActive}
                setParticipantsModelActive={setMobileParticipantsModelActive}
                votes={proposal.votes}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

function getEndBlockTime(
  proposal: Proposal,
  currentBlock: UseBlockNumberReturnType,
  endBlock: UseBlockReturnType,
) {
  let endBlockTime;
  if (currentBlock.data) {
    // If the end block is already mined, we can fetch the timestamp
    if (Number(currentBlock.data) >= proposal.endBlock && endBlock.data) {
      endBlockTime = new Date(Number(endBlock.data.timestamp) * 1000);
    } else {
      // If the end block is not mined yet, we estimate the time
      endBlockTime = new Date(
        Date.now() +
          // Estimation of ~5 seconds per block
          (proposal.endBlock - Number(currentBlock.data)) * 5000,
      );
    }
  }

  return endBlockTime;
}

export default Page;
