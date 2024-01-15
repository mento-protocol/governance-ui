"use client";
import { statusToBadgeColorMap } from "@interfaces/proposal.interface";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Input,
  Loader,
  TabList,
  WalletAddressWithCopy,
} from "@components/_shared";
import { Countdown } from "@components/countdown/countdown.component";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import styles from "./page.module.scss";
import { InferType, number, object, setLocale } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { VotesList } from "@components/votes-list/votes-list.component";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { MarkdownView } from "@/app/components/_shared/markdown-view/markdown-view.component";
import useModal from "@/app/providers/modal.provider";
import { IVoteType } from "@interfaces/vote.interface";
import { useProposalDetailsStore, useUserStore } from "@/app/store";

const validationSchema = object({
  votingPower: number().required().typeError("Invalid number").max(400),
});
type FormData = InferType<typeof validationSchema>;

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
  const { showConfirm, showModal } = useModal();

  const { proposal, isFetching, fetch, vote } = useProposalDetailsStore();
  const { walletAddress, balanceVeMENTO } = useUserStore();

  useEffect(() => {
    fetch(params.id);
  }, [params.id, fetch]);

  setLocale({
    mixed: {
      default: "Invalid number",
    },
    number: {
      max: ({ max }) => `Must not exceed ${max}`,
    },
  });

  const [votingOpened, setVotingOpened] = useState(false);
  const [votesListOpened, setVotesListOpened] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    mode: "all",
  });

  const onSubmit = (data: FormData, voteType: IVoteType) => {
    showConfirm(
      `Are you sure you want to vote with ${data.votingPower} power?`,
      {
        modalType: voteTypeToModalType(voteType),
      },
    ).then((result) => {
      if (result) {
        setValue("votingPower", 0);
        vote(voteType, data.votingPower, "xD");
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
            type={statusToBadgeColorMap[proposal.status]}
          >
            {proposal.status.toString()}
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
                  <Card.Header className="text-center text-2xl">
                    <strong>Voting</strong>
                    <button
                      className={styles.proposal_addon__close}
                      onClick={() => setVotingOpened(false)}
                    >
                      X
                    </button>
                  </Card.Header>
                  <div className="flex flex-col gap-1 ">
                    <Input
                      label="Voting power"
                      id="voting-power"
                      type="number"
                      className={styles.input}
                      placeholder="Voting power"
                      disabled={!walletAddress}
                      form={{ ...register("votingPower") }}
                      error={errors.votingPower?.message}
                      addon={
                        <div className={styles.addon}>
                          <div className="flex justify-between">
                            {!!walletAddress ? (
                              <>
                                <div className="underline">Max available</div>
                                <div>{balanceVeMENTO} MENT</div>
                              </>
                            ) : (
                              <div className="underline">
                                Please connect wallet
                              </div>
                            )}
                          </div>
                        </div>
                      }
                    />
                    <p className={styles.vote_label}>Vote</p>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!isValid}
                      theme="success"
                      block
                      onClick={handleSubmit((data) => onSubmit(data, "for"))}
                    >
                      For
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!isValid}
                      type="submit"
                      theme="danger"
                      block
                      onClick={handleSubmit((data) =>
                        onSubmit(data, "against"),
                      )}
                    >
                      Against
                    </Button>
                    <Button
                      className={styles.button_wrapper}
                      disabled={!isValid}
                      type="submit"
                      theme="tertiary"
                      block
                      onClick={handleSubmit((data) =>
                        onSubmit(data, "abstain"),
                      )}
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
