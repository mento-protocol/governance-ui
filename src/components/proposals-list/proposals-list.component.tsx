"use client";
import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import { Card, ProgressBar, Status } from "@/components/_shared";
import Link from "next/link";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { formatUnits } from "viem";
import useProposals from "@/lib/contracts/governor/useProposals";
import { cn } from "@/styles/helpers";
import { EmptyProposals } from "../_icons";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({ className }: ProposalsListProps) => {
  return (
    <div className={`w-full font-fg ${className}`}>
      <h2 className="mb-x6 mt-x11 text-center text-[32px] font-medium">
        Proposals
      </h2>
      <Card block>
        <div
          className={cn(
            "overflow-x-hidden",
            "bg-transparent bg-[20px_100%,20px_100%,10px_100%,10px_100%] bg-no-repeat  [background-attachment:local,local,scroll,scroll] [background-position:left_center,right_center,left_center,right]",
            "text_small",
            `[background-image:linear-gradient(to_right,#FFFFFF,#FFFFFF),linear-gradient(to_right,#FFFFFF,#FFFFFF),linear-gradient(to_right,rgba(0,_0,_0,_0.15),transparent),linear-gradient(to_left,rgba(0,_0,_0,_0.15),transparent)]`,
            `dark:[background-image:linear-gradient(to_right,#121316,#121316),linear-gradient(to_right,#121316,#121316),linear-gradient(to_right,rgba(156,_156,_156,_0.25),transparent),linear-gradient(to_left,rgba(156,_156,_156,_0.25),transparent)]`,
          )}
        >
          {/* Line height 24 OG: 25, letter spacing -0.304px, now 0.05em */}

          <ProposalsTable />
        </div>
      </Card>
    </div>
  );
};

const ProposalsTable = () => {
  const { proposals } = useProposals();
  if (proposals?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center overflow-hidden text-center text-[18px] md:text-[22px]">
        <EmptyProposals />
        There are no proposals to display yet
      </div>
    );
  }

  return (
    <>
      <div className="mb-[38px] hidden grid-cols-[350px_100px_150px_150px_150px] items-center gap-[21px] font-inter font-medium md:visible md:grid md:grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px]">
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
          className="mb-[21px] grid grid-cols-[60%_40%] items-start gap-2 font-medium last:mb-0 sm:grid-cols-[350px_100px_150px_150px_150px] md:grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] md:gap-[21px]"
        >
          {!!index && (
            <div className="border-b border-solid border-gray-light [grid-column:1_/_-1]" />
          )}
          <div className="order-1 self-center overflow-hidden text-ellipsis break-words text-left text-lg font-normal sm:max-w-[340px]">
            <div className="flex place-items-center gap-x3">
              <Link
                className="flex "
                style={{ maxHeight: "3em" }}
                href={`/proposals/${proposalId}`}
              >
                <p>
                  {StringService.limitLength(`${metadata?.title}`, 75, true)}
                </p>
              </Link>
            </div>
          </div>
          <Status
            className="order-3 h-auto self-center sm:order-2 sm:h-[22px] sm:w-full"
            text={state?.toString()}
            type={stateToStatusColorMap[state]}
          />
          <div className="order-2 flex items-center self-center overflow-hidden text-center md:order-3">
            <ProgressBar
              type="success"
              className="order-2 mx-auto my-0 w-full max-w-[110px] gap-x1 sm:order-3"
              current={Number(formatUnits(votes.for.total, 18))}
              max={Number(formatUnits(votes.total, 18))}
              valueFormat="alphabetic"
            />
          </div>
          <div className="order-4 flex items-center self-center overflow-hidden text-center">
            <ProgressBar
              type="danger"
              className="mx-auto my-0 w-full max-w-[110px] gap-x1"
              current={Number(formatUnits(votes.against.total, 18))}
              max={Number(formatUnits(votes.total, 18))}
              valueFormat="alphabetic"
            />
          </div>
          <div className="order-5 mr-x1 hidden self-center overflow-hidden text-right text-[22px]/[23px] font-normal md:visible md:block">
            {NumbersService.parseNumericValue(formatUnits(votes.total, 18))}
          </div>
        </div>
      ))}
    </>
  );
};
