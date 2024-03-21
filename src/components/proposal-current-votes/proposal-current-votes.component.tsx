import { Card, ProgressBar, ProgressBarItem } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import classNames from "classnames";
import styles from "./proposal-current-votes.module.scss";
import { useMemo } from "react";
import { IVote } from "@/lib/interfaces/vote.interface";
import { IProgressBarItem } from "@/components/_shared/progress-bar/progress-bar.component";

interface ProposalCurrentVotesProps extends BaseComponentProps {}

// TODO: Replace mock API with real data sources
export const ProposalCurrentVotes = ({
  className,
  style,
}: ProposalCurrentVotesProps) => {
  // TODO: Replace with context fetch to api
  const votes: IVote[] = useMemo(() => [], []);

  const { forProposal, againstProposal, abstainProposal, total } =
    useMemo(() => {
      const forProposal = votes
        .filter((vote) => vote.type === "for")
        .reduce((acc, vote) => acc + vote.votes, 0);
      const againstProposal = votes
        .filter((vote) => vote.type === "against")
        .reduce((acc, vote) => acc + vote.votes, 0);
      const abstainProposal = votes
        .filter((vote) => vote.type === "abstain")
        .reduce((acc, vote) => acc + vote.votes, 0);
      return {
        forProposal,
        againstProposal,
        abstainProposal,
        total: forProposal + againstProposal + abstainProposal,
      };
    }, [votes]);

  const progressBars: IProgressBarItem[] = useMemo(
    () =>
      [
        {
          progress: Number((total * 100) / forProposal),
          barColor: "bg-mento-mint",
        },
        {
          progress: Number((total * 100) / againstProposal),
          barColor: "bg-mento-red",
        },
      ].sort((item1, item2) => item2.progress - item1.progress),
    [againstProposal, forProposal, total],
  );

  return (
    <Card className={className} style={style}>
      <Card.Header>
        <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x3">
          Current votes
        </h3>
      </Card.Header>
      <ProgressBar className="mb-x3" backgroundColor="bg-white">
        {progressBars.map((bar, index) => (
          <ProgressBarItem
            key={`vote-bar-${index}`}
            barColor={bar.barColor}
            progress={bar.progress}
          />
        ))}
      </ProgressBar>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x6">
        <div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag, styles.success)} />
              <div>For</div>
            </div>
            <div>{forProposal.toLocaleString()}</div>
          </div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag, styles.error)} />
              <div>Against</div>
            </div>
            <div>{againstProposal.toLocaleString()}</div>
          </div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag)} />
              <div>Abstain</div>
            </div>
            <div>{abstainProposal.toLocaleString()}</div>
          </div>
        </div>
        <div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  styles.vote_tag,
                  styles.primary,
                  styles.square,
                )}
              />
              <div>Majority supports</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  styles.vote_tag,
                  styles.black,
                  styles.square,
                )}
              />
              <div>Quorum isn&apos;t reached</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  styles.vote_tag,
                  styles.invisible,
                  styles.square,
                )}
              />
              <div>270K of 999K</div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
