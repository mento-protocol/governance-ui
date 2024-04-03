import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import classNames from "classnames";
import { Card, ProgressBar, Status } from "@/components/_shared";
import Link from "next/link";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { formatUnits } from "viem";
import useProposals from "@/lib/contracts/governor/useProposals";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({ className }: ProposalsListProps) => {
  const { proposals } = useProposals();

  return (
    <div className={`w-full font-fg ${className}`}>
      <h2 className="mb-x6 mt-x11 text-center font-medium">Proposals</h2>
      <Card block>
        <div
          className={classNames(
            "bg-transparent bg-[20px_100%,20px_100%,10px_100%,10px_100%] bg-no-repeat  [background-attachment:local,local,scroll,scroll] [background-position:left_center,right_center,left_center,right]",
            "text_small",
            `[background-image:linear-gradient(to_right,#FFFFFF,#FFFFFF),linear-gradient(to_right,#FFFFFF,#FFFFFF),linear-gradient(to_right,rgba(0,_0,_0,_0.15),transparent),linear-gradient(to_left,rgba(0,_0,_0,_0.15),transparent)]`,
            `dark:[background-image:linear-gradient(to_right,#121316,#121316),linear-gradient(to_right,#121316,#121316),linear-gradient(to_right,rgba(156,_156,_156,_0.25),transparent),linear-gradient(to_left,rgba(156,_156,_156,_0.25),transparent)]`,
          )}
        >
          {/* Line height 24 OG: 25, letter spacing -0.304px, now 0.05em */}
          <div className="mb-[38px] grid grid-cols-[350px_100px_150px_150px_150px] items-center gap-[21px] font-inter font-medium md:grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px]">
            <div
              className={
                "overflow-hidden border-none text-left font-inter text-base font-medium tracking-tighter"
              }
            >
              Proposal name
            </div>
            <div
              className={
                "overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter"
              }
            >
              Status
            </div>
            <div
              className={
                "overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter"
              }
            >
              Votes in favor
            </div>
            <div
              className={
                "overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter"
              }
            >
              Votes against
            </div>
            <div
              className={
                "overflow-hidden border-none text-right font-inter text-base font-medium tracking-tighter"
              }
            >
              Total votes
            </div>
          </div>
          {proposals.map(({ proposalId, metadata, state, votes }, index) => (
            <div
              key={index}
              className="mb-[21px] grid grid-cols-[350px_100px_150px_150px_150px] items-start gap-[21px] font-medium last:mb-0 md:grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px]"
            >
              {!!index && (
                <div className="border-b border-solid border-gray-light [grid-column:1_/_-1]" />
              )}
              <div className="max-w-[340px] self-center overflow-hidden text-ellipsis break-words text-left text-lg font-normal">
                <div className="flex place-items-center gap-x3">
                  <Link
                    className="flex "
                    style={{ maxHeight: "3em" }}
                    href={`/proposals/${proposalId}`}
                  >
                    <p>
                      {StringService.limitLength(
                        `${metadata?.title}`,
                        75,
                        true,
                      )}
                    </p>
                  </Link>
                </div>
              </div>
              <Status
                className="self-center"
                text={state?.toString()}
                type={stateToStatusColorMap[state]}
              />
              <div className="flex items-center self-center overflow-hidden text-center">
                <ProgressBar
                  type="success"
                  className="mx-auto my-0 w-full max-w-[110px] gap-x1"
                  current={Number(formatUnits(votes.for.total, 18))}
                  max={Number(formatUnits(votes.total, 18))}
                  valueFormat="alphabetic"
                />
              </div>
              <div className="flex items-center self-center overflow-hidden text-center">
                <ProgressBar
                  type="danger"
                  className="mx-auto my-0 w-full max-w-[110px] gap-x1"
                  current={Number(formatUnits(votes.against.total, 18))}
                  max={Number(formatUnits(votes.total, 18))}
                  valueFormat="alphabetic"
                />
              </div>
              <div className="mr-x1 self-center overflow-hidden text-right text-[22px]/[23px] font-normal">
                {NumbersService.parseNumericValue(formatUnits(votes.total, 18))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
