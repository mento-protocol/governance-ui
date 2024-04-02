import { Card } from "@/components/_shared";
import {
  MultiProgressBar,
  MultiProgressBarValue,
} from "@/components/_shared/progress-bar/progress-bar.component";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import classNames from "classnames";
import { useCallback, useEffect, useMemo, useState } from "react";
import { IVote } from "@/lib/interfaces/vote.interface";

interface ProposalCurrentVotesProps extends BaseComponentProps {}

// TODO: Replace mock API with real data sources
export const ProposalCurrentVotes = ({
  className,
  style,
}: ProposalCurrentVotesProps) => {
  // TODO: Replace with context fetch to api
  const votes: IVote[] = useMemo(() => [], []);

  const forProposal = useMemo(
    () => votes.filter((vote) => vote.type === "for"),
    [votes],
  );
  const againstProposal = useMemo(
    () => votes.filter((vote) => vote.type === "against"),
    [votes],
  );
  const abstainProposal = useMemo(
    () => votes.filter((vote) => vote.type === "abstain"),
    [votes],
  );

  const parseVotes = useCallback(() => {
    return [
      {
        value: forProposal.reduce((acc, vote) => acc + vote.votes, 0),
        type: "success",
      },
      {
        value: againstProposal.reduce((acc, vote) => acc + vote.votes, 0),
        type: "danger",
      },
    ] as MultiProgressBarValue[];
  }, [againstProposal, forProposal]);

  const parseMax = useCallback(() => {
    return (
      forProposal.reduce((acc, vote) => acc + vote.votes, 0) +
      againstProposal.reduce((acc, vote) => acc + vote.votes, 0) +
      abstainProposal.reduce((acc, vote) => acc + vote.votes, 0)
    );
  }, [abstainProposal, againstProposal, forProposal]);

  const [values, setValues] = useState(parseVotes());
  const [max, setMax] = useState(parseMax());

  useEffect(() => {
    setValues(parseVotes());
    setMax(parseMax());
  }, [votes, parseVotes, parseMax]);

  return (
    <Card className={className} style={style}>
      <Card.Header>
        <h3 className="font-size-x6 line-height-x6 mb-x3 flex justify-center font-medium">
          Current votes
        </h3>
      </Card.Header>
      <MultiProgressBar className="mb-x3" values={values} max={max} />
      <div className="grid grid-cols-1 gap-x6 md:grid-cols-2">
        <div>
          <div className="mb-x3 flex justify-between">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']",
                  "bg-success",
                )}
              />
              <div>For</div>
            </div>
            <div>
              {forProposal
                .reduce((acc, vote) => acc + vote.votes, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="mb-x3 flex justify-between">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']",
                  "bg-error",
                )}
              />
              <div>Against</div>
            </div>
            <div>
              {againstProposal
                .reduce((acc, vote) => acc + vote.votes, 0)
                .toLocaleString()}
            </div>
          </div>
          <div className="mb-x3 flex justify-between">
            <div className="flex items-center gap-x3">
              <div className="h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']" />
              <div>Abstain</div>
            </div>
            <div>
              {abstainProposal
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
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']",
                  "bg-primary",
                  "rounded-[8px]",
                )}
              />
              <div>Majority supports</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']",
                  "bg-black",
                  "rounded-[8px]",
                )}
              />
              <div>Quorum isn&apos;t reached</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              <div
                className={classNames(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']",
                  "opacity-0",
                  "rounded-[8px]",
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
