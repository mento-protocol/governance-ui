import {
  Card,
  MultiProgressBar,
  MultiProgressBarValue,
} from "@/components/_shared";

import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { useMemo } from "react";
import { cn } from "@/styles/helpers";
import { Proposal } from "@/lib/graphql/subgraph/generated/subgraph";
import NumbersService from "@/lib/helpers/numbers.service";
import { formatUnits } from "viem";
import { CheckMarkIcon } from "@/components/_icons/checkmark.icon";
import { CrossMarkIcon } from "@/components/_icons/crossmark.icon";
import { useQuorum } from "@/lib/contracts/governor/useQuorum";

interface ProposalCurrentVotesProps extends BaseComponentProps {
  proposal: Proposal;
}

// TODO: Replace mock API with real data sources
export const ProposalCurrentVotes = ({
  className,
  proposal,
}: ProposalCurrentVotesProps) => {
  const { quorumNeeded } = useQuorum(proposal.startBlock);

  const values = useMemo(() => {
    return [
      {
        value: Number(proposal.votes.total / 2n),
        // value: Number(proposal.votes.for.total),
        type: "success",
      },
      {
        value: Number(proposal.votes.total / 2n),
        // value: Number(proposal.votes.against.total),
        type: "danger",
      },
    ] as MultiProgressBarValue[];
  }, [proposal.votes.total]);

  const majoritySupport = useMemo(() => {
    if (proposal.votes.total === 0n || proposal.votes.for.total === 0n)
      return false;

    return (
      (proposal.votes.for.total * 100n) / proposal.votes.total >
      proposal.votes.total / 2n
    );
  }, [proposal.votes.for.total, proposal.votes.total]);

  return (
    <Card className={className}>
      <Card.Header>
        <h3 className="mb-x3 flex justify-center text-[32px]/none font-medium">
          Current votes
        </h3>
      </Card.Header>
      <MultiProgressBar
        className="mb-x3"
        values={values}
        max={Number(proposal.votes.total)}
      />
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
              {NumbersService.parseNumericValue(
                formatUnits(proposal.votes.for.total, 18),
              )}
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
              {NumbersService.parseNumericValue(
                formatUnits(proposal.votes.against.total, 18),
              )}
            </div>
          </div>
          <div className="mb-x3 flex justify-between">
            <div className="flex items-center gap-x3">
              <div className="h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white content-['']" />
              <div>Abstain</div>
            </div>
            <div>
              {NumbersService.parseNumericValue(
                formatUnits(proposal.votes.abstain.total, 18),
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="mb-x3">
            <div className="flex items-center gap-x3">
              {majoritySupport && <CheckMarkIcon />}
              {!majoritySupport && <CrossMarkIcon />}
              <div>Majority supports</div>
            </div>
          </div>
          <div className="mb-x3">
            <div className="flex items-center justify-start gap-x3">
              <CrossMarkIcon />
              <div>
                Quorum isn&apos;t reached <br />{" "}
                {NumbersService.parseNumericValue(
                  formatUnits(proposal.votes.for.total, 18),
                )}{" "}
                of{" "}
                {NumbersService.parseNumericValue(
                  formatUnits(quorumNeeded || 0n, 18),
                )}
              </div>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </Card>
  );
};
