import {
  Card,
  MultiProgressBar,
  MultiProgressBarValue,
} from "@/components/_shared";

import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { SVGProps, useCallback, useEffect, useMemo, useState } from "react";
import { IVote } from "@/lib/interfaces/vote.interface";
import { cn } from "@/styles/helpers";

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
      <div className="grid grid-cols-1 gap-x6 text-[22px]/none md:grid-cols-2">
        <div>
          <div className="mb-x3 flex justify-between">
            <div className="flex items-center gap-x3">
              <div
                className={cn(
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
                className={cn(
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
                className={cn(
                  "flex h-x3 w-x3 items-center justify-center border  border-black bg-white text-white",
                  "bg-primary",
                  "rounded-[4px]",
                )}
              >
                <TickMark />
              </div>
              <div>Majority supports</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex justify-start gap-x3">
              <div
                className={cn(
                  "flex h-x3 w-x3 items-center justify-center border border-black text-white",
                  "bg-black",
                  "rounded-[4px]",
                )}
              >
                <XMark />
              </div>
              <div>
                Quorum isn&apos;t reached <br /> 270K of 999K
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};

const TickMark = () => {
  return (
    <svg
      className="h-2.5 w-2.5" // Width and height class from TailwindCSS (3rem by 3rem)
      viewBox="0 0 50 50" // ViewBox to control the scaling of the SVG contents
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 25 L20 40 L45 5"
        stroke="white" // Stroke color
        strokeWidth="6" // Stroke width
        fill="none" // No fill color
        strokeLinecap="round" // Rounded line caps
        // TailwindCSS classes for animation and hover effect
      />
    </svg>
  );
};

const XMark = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 10 10"
      fill="none"
      className={cn("h-2.5 w-2.5", props.className)}
      {...props}
    >
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.74.624c.241.241.241.632 0 .872l-7.398 7.4a.617.617 0 1 1-.872-.873L7.87.624c.24-.24.63-.24.872 0Z"
        clipRule="evenodd"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.74 8.895a.617.617 0 0 1-.872 0L.469 1.496a.617.617 0 0 1 .872-.872L8.74 8.023c.24.24.24.631 0 .872Z"
        clipRule="evenodd"
      />
    </svg>
  );
};
