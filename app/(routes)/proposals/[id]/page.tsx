"use client";
import { MarkdownView } from "@/app/components/_shared/markdown-view/markdown-view.component";
import useModal from "@/app/providers/modal.provider";
import { useProposalDetailsStore, useUserStore } from "@/app/store";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Loader,
  TabList,
  WalletAddressWithCopy,
} from "@components/_shared";
import { Countdown } from "@components/countdown/countdown.component";
import { VotesList } from "@components/votes-list/votes-list.component";
import { stateToBadgeColorMap } from "@interfaces/proposal.interface";
import { IVoteType } from "@interfaces/vote.interface";
import classNames from "classnames";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const voteTypeToModalType = (voteType: IVoteType) => {
  switch (voteType) {
    case "for":
      return "success";
    case "against":
      return "error";
    case "abstain":
    default:
      return "info";
  }
};

const Page = ({ params }: { params: { id: string } }) => {
  const { showConfirm } = useModal();

  const { proposal, isFetching, fetch, vote } = useProposalDetailsStore();
  const { walletAddress, balanceVeMENTO } = useUserStore();

  useEffect(() => {
    fetch(params.id);
  }, [params.id, fetch]);

  const [votingOpened, setVotingOpened] = useState(false);
  const [votesListOpened, setVotesListOpened] = useState(false);

  const onSubmit = (voteType: IVoteType) => {
    showConfirm(`Are you sure you want to vote with ${balanceVeMENTO} power?`, {
      modalType: voteTypeToModalType(voteType),
    }).then((result) => {
      if (result) {
        vote(voteType, balanceVeMENTO, walletAddress || "");
      }
    });
  };

  return (
    <main className="flex flex-col">
      {isFetching && <Loader isCenter />}
      {!isFetching && !proposal && <div>Proposal not found</div>}
      {!isFetching && proposal && (
        <>
          <Badge
            className="uppercase mt-x6 mb-3 font-medium"
            type={stateToBadgeColorMap[proposal.state]}
          >
            {proposal.state.toString()}
          </Badge>
          <div className="flex flex-col md:grid md:grid-cols-7 gap-x1 ">
            <div className="md:col-start-1 md:col-span-4">
              <h1 className="text-xl md:text-5xl font-semibold">
                {proposal.title}
              </h1>
            </div>
            <div className="md:col-start-5 md:col-span-3">
              <Countdown
                end={proposal.deadlineAt}
                countDownMilliseconds={1000}
              />
            </div>
          </div>
          <div className="flex flex-wrap place-items-center justify-start md:justify-between mt-8 gap-x1 ">
            <div className="flex place-items-center gap-1">
              <Avatar address={proposal.creator || ""} />
              <div>by {proposal.creator}</div>
            </div>
            <div className="flex place-items-center gap-x2">
              <code>ID</code>
              <WalletAddressWithCopy address={proposal.id} />
            </div>
            <div className="flex place-items-center gap-1">
              <span>Proposed on:</span>
              <strong>{format(proposal.createdAt, "MMMM do, yyyy")}</strong>
            </div>
            <div className="flex place-items-center gap-1">
              <span>Voting deadline:</span>
              <strong>{format(proposal.deadlineAt, "MMMM do, yyyy")}</strong>
            </div>
          </div>

          <div className="mt-8 flex flex-col md:flex-row md:justify-between place-items-start gap-x1 ">
            <div className={classNames(styles.details, "flex-1")}>
              <h3>Details</h3>
              <MarkdownView markdown={proposal.description} />
            </div>
            <div className={styles.proposal_addons}>
              <div className={classNames(styles.mobile_controls)}>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  disabled={!walletAddress}
                  className={styles.mobile_button}
                  theme="primary"
                  onClick={() => setVotingOpened(true)}
                >
                  Vote
                </Button>
                <Button
                  wrapperClassName={styles.mobile_button_wrapper}
                  className={styles.mobile_button}
                  theme="secondary"
                  onClick={() => setVotesListOpened(true)}
                >
                  Votes
                </Button>
              </div>
              <div
                className={classNames(
                  styles.backdrop,
                  votingOpened && styles.opened,
                )}
              >
                <Card
                  className={classNames(
                    styles.proposal_addon,
                    votingOpened && styles.opened,
                    !walletAddress && "!opacity-60",
                  )}
                >
                  <Card.Header className="text-center">
                    <h2 className={styles.votes_title}>Cast votes</h2>
                    <button
                      className={styles.proposal_addon__close}
                      onClick={() => setVotingOpened(false)}
                    >
                      X
                    </button>
                  </Card.Header>
                  <div className="flex flex-col gap-1 ">
                    <div className={styles.addon}>
                      <div className="flex justify-center">
                        {!!walletAddress ? (
                          <div className={styles.power}>
                            <div className={styles.power__title}>
                              Your voting power
                            </div>
                            <div className={styles.power__value}>
                              {balanceVeMENTO} veMENTO
                            </div>
                          </div>
                        ) : (
                          <div className="underline">Please connect wallet</div>
                        )}
                      </div>
                    </div>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      theme="success"
                      block
                      onClick={() => onSubmit("for")}
                    >
                      For
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      type="submit"
                      theme="danger"
                      block
                      onClick={() => onSubmit("against")}
                    >
                      Against
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!walletAddress}
                      type="submit"
                      theme="tertiary"
                      block
                      onClick={() => onSubmit("abstain")}
                    >
                      Abstain
                    </Button>
                  </div>
                </Card>
              </div>
              <div
                className={classNames(
                  styles.backdrop,
                  votesListOpened && styles.opened,
                )}
              >
                <Card
                  className={classNames(
                    styles.proposal_addon,
                    votesListOpened && styles.opened,
                    styles.votesList,
                    "mt-5",
                  )}
                >
                  <Card.Header className="text-center text-2xl">
                    <strong>Votes</strong>
                    <button
                      className={styles.proposal_addon__close}
                      onClick={() => setVotesListOpened(false)}
                    >
                      X
                    </button>
                  </Card.Header>
                  <TabList tabs={["For", "Against", "Abstain"]}>
                    <VotesList voteType="for" />
                    <VotesList voteType="against" />
                    <VotesList voteType="abstain" />
                  </TabList>
                </Card>
              </div>
            </div>
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
