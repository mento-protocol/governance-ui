"use client";
import { GetProposal, ProposalState } from "@/app/graphql";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useUserStore } from "@/app/store";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { useBlock } from "wagmi";
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
  const { data } = useSuspenseQuery(GetProposal, {
    variables: { id: params.id },
  });
  useProposalStates(data?.proposals);
  const proposal = data?.proposals[0];
  console.log(proposal);

  // The modals are mobile-only
  const [votingModalActive, setVotingModalActive] = useState(false);
  const [participantsModalActive, setParticipantsModelActive] = useState(false);

  // TODO: Check if there can be cases where proposalCreated[0] can be undefined or if there can be multiple elements in the array
  const proposedOn = format(
    new Date(parseInt(proposal.proposalCreated[0].timestamp) * 1000),
    "MMMM do, yyyy",
  );

  // TODO: Reimplement voteEnd date considering all possible proposal states
  // i.e. useBlock only works AFTER voting has finished, during or before voting deadline
  // we will need to approximate the end date via sth like `Date.now() + (endBlock - currentblock) * 5 seconds`
  const block = useBlock({ blockNumber: BigInt(proposal.endBlock) });
  let voteEnd;
  if (block.data?.timestamp) {
    voteEnd = format(
      new Date(Number(block.data.timestamp) * 1000),
      "MMMM do, yyyy 'at' hh:mma",
    );
  }

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
            {proposal.state.toString()}
          </Badge>
          <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
              <h1 className="text-xl md:font-size-x11 md:line-height-x11 font-medium">
                {proposal.metadata.title}
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
              <Avatar address={proposal.proposer.id || ""} />
              by{" "}
              <span className="font-medium">
                <WalletAddressWithCopy address={proposal.proposer.id} />
              </span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Proposed on:</span>
              <span className="font-medium">{proposedOn}</span>
            </div>
            <div className="flex place-items-center gap-x2">
              <span>Voting deadline:</span>
              <span className="font-medium">{voteEnd}</span>
            </div>
          </div>
          <div className="mt-x6 flex flex-col md:flex-row md:justify-between place-items-start gap-x1 ">
            <div className={classNames(styles.details, "flex-1")}>
              <ProposalCurrentVotes className="mb-x6" />
              <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x6">
                Proposal Description
              </h3>
              <MarkdownView markdown={proposal.metadata.description} />
              {/* TODO: Implement 'Execution Code' section */}
              <ExecutionCode />
            </div>
            <div className={styles.proposal_addons}>
              <div className={classNames(styles.mobile_controls)}>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  disabled={!walletAddress}
                  className={styles.mobile_button}
                  theme="primary"
                  onClick={() => setVotingModalActive(true)}
                >
                  Vote
                </Button>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  className={styles.mobile_button}
                  theme="secondary"
                  onClick={() => setParticipantsModelActive(true)}
                >
                  Participants
                </Button>
              </div>
              {/* TODO: Wire up voting buttons to actually trigger a TX */}
              {/* TODO: Hide voting section when voting isn't active */}
              <Vote
                balanceVeMENTO={balanceVeMENTO}
                setVotingModalActive={setVotingModalActive}
                votingModalActive={votingModalActive}
                walletAddress={walletAddress}
              />
              {/* TODO: Load actual voting participants from subgraph */}
              <Participants
                participantsModalActive={participantsModalActive}
                setParticipantsModelActive={setParticipantsModelActive}
              />
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
