import {
  Card,
  Loader,
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
    if (proposal.votes.total === 0n) return [];

    return [
      {
        progress: Number(
          (proposal.votes.for.total * 100n) / proposal.votes.total,
        ),
        type: "success",
      },
      {
        progress: Number(
          (proposal.votes.against.total * 100n) / proposal.votes.total,
        ),
        type: "danger",
      },
      {
        progress: Number(
          (proposal.votes.abstain.total * 100n) / proposal.votes.total,
        ),
        type: "info",
      },
    ] as MultiProgressBarValue[];
  }, [
    proposal.votes.abstain.total,
    proposal.votes.against.total,
    proposal.votes.for.total,
    proposal.votes.total,
  ]);

  const majoritySupport = useMemo(() => {
    if (proposal.votes.total === 0n) return false;

    return (proposal.votes.for.total * 100n) / proposal.votes.total > 50n;
  }, [proposal.votes.for.total, proposal.votes.total]);

  return (
    <Card className={cn(className, "p-4")}>
      <Card.Header>
        <h3 className="mb-8 flex justify-center text-[32px]/none font-medium">
          Current votes
        </h3>
      </Card.Header>
      <MultiProgressBar className="mb-8" values={values} />
      <div className="grid grid-cols-1 gap-x-12 text-[22px]/none md:grid-cols-2">
        <div className="flex flex-col gap-y-6">
          <div className="flex justify-between">
            <div className="flex items-center gap-x3">
              <div
                className={cn(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white",
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
          <div className="flex justify-between">
            <div className="flex items-center gap-x3">
              <div
                className={cn(
                  "h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white",
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
          <div className="flex justify-between">
            <div className="flex items-center gap-x3">
              <div className="h-x3 w-x3 rounded-[50%] border border-solid border-black bg-white" />
              <div>Abstain</div>
            </div>
            <div>
              {NumbersService.parseNumericValue(
                formatUnits(proposal.votes.abstain.total, 18),
              )}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-y-6 md:mt-0">
          <div>
            <div className="flex items-center gap-x3">
              {majoritySupport && <CheckMarkIcon />}
              {!majoritySupport && <CrossMarkIcon />}
              <div>Majority supports</div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-start gap-x3">
              {!!quorumNeeded &&
                quorumNeeded > BigInt(proposal.votes.for.total) && (
                  <CrossMarkIcon />
                )}
              {!!quorumNeeded &&
                quorumNeeded <= BigInt(proposal.votes.for.total) && (
                  <CheckMarkIcon />
                )}

              <div>
                {!quorumNeeded ? (
                  <Loader />
                ) : (
                  <>
                    {quorumNeeded > BigInt(proposal.votes.for.total) && (
                      <>
                        Quorum isn&apos;t reached <br />{" "}
                        {NumbersService.parseNumericValue(
                          formatUnits(proposal.votes.for.total, 18),
                        )}{" "}
                        of{" "}
                        {NumbersService.parseNumericValue(
                          formatUnits(quorumNeeded || 0n, 18),
                        )}
                      </>
                    )}
                    {quorumNeeded <= BigInt(proposal.votes.for.total) && (
                      <>Quorum reached</>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
