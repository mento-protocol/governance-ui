"use client";
import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import { ProgressBar, Status } from "@/components/_shared";
import Link from "next/link";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { formatUnits } from "viem";
import useProposals from "@/lib/contracts/governor/useProposals";
import { Proposal } from "@/lib/graphql/subgraph/generated/subgraph";
import { EmptyProposals } from "../_icons";
import { MentoIcon } from "../_icons";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({ className }: ProposalsListProps) => {
  return (
    <div className={`w-full font-fg ${className}`}>
      <h2 className="pb-[32px] pt-[30px] text-center text-[22px] font-medium md:pb-[34px] md:pt-[76px]">
        Proposals
      </h2>
      <ProposalsTable />
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
      <div className="hidden lg:block">
        <DesktopProposalTable proposals={proposals} />
      </div>
      <div className="lg:hidden">
        <MobileProposalTable proposals={proposals} />
      </div>
    </>
  );
};

const DesktopProposalTable = ({ proposals }: { proposals: Proposal[] }) => {
  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5">
      <div className="mb-[38px] grid grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] items-center gap-[21px] font-inter font-medium">
        <div className="overflow-hidden border-none text-left font-inter text-base font-medium tracking-tighter">
          Proposal name
        </div>
        <div className="overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter">
          Status
        </div>
        <div className="overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter">
          Votes in favor
        </div>
        <div className="overflow-hidden border-none text-center font-inter text-base font-medium tracking-tighter">
          Votes against
        </div>
        <div className="overflow-hidden border-none text-right font-inter text-base font-medium tracking-tighter">
          Total votes
        </div>
      </div>
      {proposals.map(({ proposalId, metadata, state, votes }, index) => (
        <div
          key={index}
          className="grid grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] items-start gap-[18px] pb-[18px] font-medium"
        >
          {!!index && (
            <div className="border-b border-solid border-gray-light [grid-column:1_/_-1]" />
          )}
          <div className="self-center overflow-hidden text-ellipsis break-words text-left text-lg font-normal">
            <div className="flex place-items-center gap-x3">
              <MentoIcon className="h-[42px] w-[40px]" backgroundColor="cyan" />
              <Link
                className="flex"
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
            className="h-[22px] w-full self-center"
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
      <div className="left-0 right-0 flex border-b border-solid border-gray-light " />
    </div>
  );
};

const MobileProposalTable = ({ proposals }: { proposals: Proposal[] }) => {
  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5">
      {proposals.map(({ proposalId, metadata, state, votes }, index) => (
        <div
          key={index}
          className="relative grid grid-cols-[60%_40%] items-start pb-[8px] pt-[20px] font-medium first:pt-0 last:mb-0"
        >
          {!!index && (
            <div className="absolute left-0 right-0 border-b border-solid border-gray-light " />
          )}

          <div className="font-size-[18px] -mt-[] flex self-start overflow-hidden text-ellipsis break-words text-left font-normal leading-none">
            <Link
              className="flex"
              style={{ maxHeight: "3em" }}
              href={`/proposals/${proposalId}`}
            >
              <p>{StringService.limitLength(`${metadata?.title}`, 75, true)}</p>
            </Link>
          </div>
          <div className="flex justify-end overflow-hidden pb-[8px]">
            <ProgressBar
              type="success"
              className="align-right w-full max-w-[110px] "
              current={Number(formatUnits(votes.for.total, 18))}
              max={Number(formatUnits(votes.total, 18))}
              valueFormat="alphabetic"
            />
          </div>
          <div className="flex overflow-hidden pt-[8px]">
            <Status
              className="h-auto self-center"
              text={state?.toString()}
              type={stateToStatusColorMap[state]}
            />
          </div>

          <div className="flex justify-end overflow-hidden pb-[8.35px] ">
            <ProgressBar
              type="danger"
              className="align-right w-full max-w-[110px]"
              current={Number(formatUnits(votes.against.total, 18))}
              max={Number(formatUnits(votes.total, 18))}
              valueFormat="alphabetic"
            />
          </div>
        </div>
      ))}
      <div className="left-0 right-0 flex border-b border-solid border-gray-light " />
    </div>
  );
};
