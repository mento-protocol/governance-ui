"use client";
import { GetProposal, Proposal, ProposalState } from "@/app/graphql";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useUserStore } from "@/app/store";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { UseBlockReturnType, useBlock, useBlockNumber } from "wagmi";
import styles from "./page.module.scss";

// Components
import { MarkdownView } from "@/app/components/_shared/markdown-view/markdown-view.component";
import {
  Avatar,
  Badge,
  Button,
  Loader,
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

  useProposalStates(data?.proposals);

  const [mobileVotingModalActive, setMobileVotingModalActive] = useState(false);
  const [mobileParticipantsModalActive, setMobileParticipantsModelActive] =
    useState(false);

  const proposal = data?.proposals[0];
  const currentBlock = useBlockNumber();
  const endBlock = useBlock({ blockNumber: BigInt(proposal.endBlock) });

  const proposerId = proposal.proposer?.id;
  const status = proposal.state?.toString();
  const { title, description } = proposal.metadata;

  const proposedOn = format(
    // Bit weird that proposalCreated is an array but there should really ever be 1 ProposalCreated event so we just take the first one
    new Date(proposal.proposalCreated[0].timestamp * 1000),
    "MMMM do, yyyy 'at' hh:mm a",
  );
  const votingDeadline = getEndBlockTime(proposal, currentBlock.data, endBlock);

  // TODO: Implement proper loading logic
  const loading = false;

  return (
    <main className="flex flex-col">
      {loading && <Loader isCenter />}
      {!loading && !proposal && <div>Proposal not found</div>}
      {!loading && proposal && (
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
            <div className="md:col-start-5 md:col-span-3"></div>
            <div className="md:col-start-5 md:col-span-3">
              {estimatedBlockTimestamp ? (
                <Countdown
                  end={estimatedBlockTimestamp}
                  countDownMilliseconds={1000}
                />
              ) : null}
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
              <span className="font-medium">{proposedOn}</span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Voting deadline:</span>
              <span className="font-medium">{votingDeadline}</span>
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
              {/* TODO: Wire up voting buttons to actually trigger a TX */}
              {/* TODO: Hide voting section when voting isn't active */}
              <Vote
                balanceVeMENTO={balanceVeMENTO}
                setVotingModalActive={setMobileVotingModalActive}
                votingModalActive={mobileVotingModalActive}
                walletAddress={walletAddress}
              />
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
  currentBlock: bigint | undefined,
  endBlock: UseBlockReturnType,
) {
  let endBlockTime;
  if (currentBlock) {
    // If the end block is already mined, we can fetch the timestamp
    if (Number(currentBlock) >= proposal.endBlock && endBlock.data) {
      endBlockTime = format(
        new Date(Number(endBlock.data.timestamp) * 1000),
        "MMMM do, yyyy 'at' hh:mm a",
      );
    } else {
      // If the end block is not mined yet, we estimate the time
      endBlockTime = format(
        new Date(
          Date.now() +
            // Estimation of ~5 seconds per block
            (proposal.endBlock - Number(currentBlock)) * 5000,
        ),
        "MMMM do, yyyy 'at' hh:mm a",
      );
    }
  }

  return endBlockTime;
}

export default Page;
