import { useProposalDetailsStore } from "@lib/store";
import { Card } from "@components/_shared";
import {
  MultiProgressBar,
  MultiProgressBarValue,
} from "@components/_shared/progress-bar/progress-bar.component";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import classNames from "classnames";
import { useCallback, useEffect, useState } from "react";
import styles from "./proposal-current-votes.module.scss";

interface ProposalCurrentVotesProps extends BaseComponentProps {}

// TODO: Replace mock API with real data sources
export const ProposalCurrentVotes = ({
  className,
  style,
}: ProposalCurrentVotesProps) => {
  const { votes } = useProposalDetailsStore();

  const parseVotes = useCallback(() => {
    return [
      {
        value: votes.for.reduce((acc, vote) => acc + vote.votes, 0),
        type: "success",
      },
      {
        value: votes.against.reduce((acc, vote) => acc + vote.votes, 0),
        type: "danger",
      },
    ] as MultiProgressBarValue[];
  }, [votes]);

  const parseMax = useCallback(() => {
    return (
      votes.for.reduce((acc, vote) => acc + vote.votes, 0) +
      votes.against.reduce((acc, vote) => acc + vote.votes, 0) +
      votes.abstain.reduce((acc, vote) => acc + vote.votes, 0)
    );
  }, [votes]);

  const [values, setValues] = useState(parseVotes());
  const [max, setMax] = useState(parseMax());

  useEffect(() => {
    setValues(parseVotes());
    setMax(parseMax());
  }, [votes, parseVotes, parseMax]);

  return (
    <Card className={className} style={style}>
      <Card.Header>
        <h3 className="flex justify-center font-size-x6 line-height-x6 font-medium mb-x3">
          Current votes
        </h3>
      </Card.Header>
      <MultiProgressBar className="mb-x3" values={values} max={max} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x6">
        <div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag, styles.success)} />
              <div>For</div>
            </div>
            <div>
              {votes.for
                .reduce((acc, vote) => acc + vote.votes, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag, styles.error)} />
              <div>Against</div>
            </div>
            <div>
              {votes.against
                .reduce((acc, vote) => acc + vote.votes, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="flex justify-between mb-x3">
            <div className="flex items-center gap-x3">
              <div className={classNames(styles.vote_tag)} />
              <div>Abstain</div>
            </div>
            <div>
              {votes.abstain
                .reduce((acc, vote) => acc + vote.votes, 0)
                .toLocaleString()}
            </div>
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
              <div>Quorum isn’t reached</div>
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
