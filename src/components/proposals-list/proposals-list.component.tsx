"use client";
import { Card, ProgressBar, Status } from "@/components/_shared";
import useProposals from "@/lib/contracts/governor/useProposals";
import { Proposal } from "@/lib/graphql/subgraph/generated/subgraph";
import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { cn } from "@/styles/helpers";
import Link from "next/link";
import React from "react";
import { formatUnits } from "viem";
import { EmptyProposals, MentoIcon } from "../_icons";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({ className }: ProposalsListProps) => {
  return (
    <div className={`w-full font-fg ${className}`}>
      <h2 className="pb-[32px] pt-[30px] text-center text-[32px] font-medium md:pt-[56px]">
        Proposals
      </h2>
      <ProposalsTable />
    </div>
  );
};

const ProposalsTable = () => {
  const { proposals, isLoading } = useProposals();
  if (proposals?.length === 0 && !isLoading) {
    return (
      <Card className="flex flex-col items-center justify-center">
        <EmptyProposals />
        There are no proposals to display yet
      </Card>
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
  const { isLoading } = useProposals();

  if (isLoading) {
    return <DesktopProposalTableSkeleton />;
  }

  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5 dark:bg-black-off">
      <ProposalTableHeader />
      {proposals.map(({ proposalId, metadata, state, votes }, index) => (
        <React.Fragment key={proposalId}>
          <div
            className={cn(
              "grid grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] items-start gap-[18px] pb-2 font-medium",
              index !== 0 && "pt-6",
            )}
          >
            <div className="self-center overflow-hidden text-ellipsis break-words text-left text-lg font-normal">
              <div className="flex items-center justify-start gap-x1 overflow-hidden text-ellipsis break-words">
                <MentoIcon
                  className="h-[42px] min-w-[60px]"
                  backgroundColor="cyan"
                />
                <Link
                  className="leading-none"
                  href={`/proposals/${proposalId}`}
                >
                  {StringService.limitLength(`${metadata?.title}`, 60, true)}
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
                className="mx-auto my-0 w-full max-w-[110px]"
                current={Number(formatUnits(votes.for.total, 18))}
                max={Number(formatUnits(votes.total, 18))}
                valueFormat="alphabetic"
              />
            </div>
            <div className="flex items-center self-center overflow-hidden text-center">
              <ProgressBar
                type="danger"
                className="mx-auto my-0 w-full max-w-[110px]"
                current={Number(formatUnits(votes.against.total, 18))}
                max={Number(formatUnits(votes.total, 18))}
                valueFormat="alphabetic"
              />
            </div>
            <div className="mr-x1 self-start overflow-hidden text-right text-[22px]/[23px] font-normal">
              {NumbersService.parseNumericValue(formatUnits(votes.total, 18))}
            </div>
          </div>
          {!(index === proposals.length - 1) && <TableDivider />}
        </React.Fragment>
      ))}
    </div>
  );
};

const DesktopProposalTableSkeleton = () => {
  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5 dark:bg-black-off">
      <ProposalTableHeader />
      {[1, 2, 3].map((_, index) => (
        <React.Fragment key={index}>
          <div
            className={cn(
              "grid grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] items-start gap-[18px] pb-2 font-medium",
              index !== 0 && "pt-6",
            )}
          >
            <div className="flex items-center gap-x1">
              <div className="h-[42px] min-w-[42px] animate-pulse rounded-full bg-gray-300" />
              <div className="h-6 w-60 animate-pulse rounded-md bg-gray-300" />
            </div>
            <div className="h-[22px] w-full animate-pulse rounded-md bg-gray-300" />

            <div className="mx-auto flex w-[110px] flex-col items-end gap-1 self-center">
              <div className="h-6 w-8 animate-pulse rounded-md bg-gray-300" />
              <div className="h-4 w-full animate-pulse self-center rounded-md bg-gray-300" />
            </div>

            <div className="mx-auto flex w-[110px] flex-col items-end gap-1 self-center">
              <div className="h-6 w-8 animate-pulse rounded-md bg-gray-300" />
              <div className="h-4 w-full animate-pulse self-center rounded-md bg-gray-300" />
            </div>

            <div className="h-6 w-12 animate-pulse justify-self-end rounded-md bg-gray-300" />
          </div>
          {index !== 2 && <TableDivider />}
        </React.Fragment>
      ))}
    </div>
  );
};

const MobileProposalTable = ({ proposals }: { proposals: Proposal[] }) => {
  const { isLoading } = useProposals();

  if (isLoading) {
    return <MobileProposalTableSkeleton />;
  }

  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5 dark:bg-black-off">
      {proposals.map((proposal, index) => (
        <React.Fragment key={proposal.proposalId}>
          <div className="relative grid grid-cols-[60%_40%] items-start pb-[8px] pt-[20px] font-medium first:pt-0 last:mb-0">
            <div className="font-size-[18px] flex self-start overflow-hidden text-ellipsis break-words text-left font-normal leading-5">
              <Link
                className="flex"
                style={{ maxHeight: "3em" }}
                href={`/proposals/${proposal.proposalId}`}
              >
                <p>
                  {StringService.limitLength(
                    `${proposal.metadata?.title}`,
                    75,
                    true,
                  )}
                </p>
              </Link>
            </div>
            <div className="flex justify-end overflow-hidden pb-[8px]">
              <ProgressBar
                type="success"
                className="align-right w-full max-w-[110px] "
                current={Number(formatUnits(proposal.votes.for.total, 18))}
                max={Number(formatUnits(proposal.votes.total, 18))}
                valueFormat="alphabetic"
              />
            </div>
            <div className="flex overflow-hidden pt-[8px]">
              <Status
                className="h-auto self-center"
                text={proposal.state?.toString()}
                type={stateToStatusColorMap[proposal.state]}
              />
            </div>

            <div className="flex justify-end overflow-hidden pb-[8.35px] ">
              <ProgressBar
                type="danger"
                className="align-right w-full max-w-[110px]"
                current={Number(formatUnits(proposal.votes.against.total, 18))}
                max={Number(formatUnits(proposal.votes.total, 18))}
                valueFormat="alphabetic"
              />
            </div>
          </div>
          {index !== proposals.length - 1 && <TableDivider />}
        </React.Fragment>
      ))}
    </div>
  );
};

const MobileProposalTableSkeleton = () => {
  return (
    <div className="rounded-md border border-gray-light bg-white px-4 py-5 dark:bg-black-off">
      {[1, 2, 3].map((_, index) => (
        <React.Fragment key={index}>
          <div className="relative grid grid-cols-[60%_40%] items-start pb-[8px] pt-[20px] font-medium first:pt-0 last:mb-0">
            <div className="h-12 w-4/5 animate-pulse rounded-md bg-gray-300" />
            <div className="flex justify-end">
              <div className="h-4 w-[110px] animate-pulse rounded-md bg-gray-300" />
            </div>
            <div className="flex flex-col gap-1 pt-[8px]">
              <div className="h-4 w-12 animate-pulse rounded-md bg-gray-300" />
              <div className="h-[22px] w-20 animate-pulse rounded-md bg-gray-300" />
            </div>
            <div className="flex justify-end">
              <div className="h-4 w-[110px] animate-pulse rounded-md bg-gray-300" />
            </div>
          </div>
          {index !== 2 && <TableDivider />}
        </React.Fragment>
      ))}
    </div>
  );
};

const ProposalTableHeader = () => {
  const headers = [
    "Proposal name",
    "Status",
    "Votes in favor",
    "Votes against",
    "Total votes",
  ];

  return (
    <div className="mb-[38px] grid grid-cols-[minmax(150px,_2fr)_100px_150px_150px_150px] items-center gap-[21px] font-inter font-medium">
      {headers.map((text, index) => (
        <div
          key={index}
          className={`overflow-hidden border-none font-inter text-base font-medium tracking-tighter ${getTextPosition(
            index,
            headers,
          )}`}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

const TableDivider = ({
  className,
  fullWidth = true,
}: {
  className?: string;
  fullWidth?: boolean;
}) => (
  <div
    className={cn(
      "border-b border-solid border-gray-light",
      fullWidth && "[grid-column:1_/_-1]",
      className,
    )}
  />
);

function getTextPosition(index: number, headers: string[]) {
  if (index === 0) {
    return "text-left";
  }
  if (index === headers.length - 1) {
    return "text-right";
  }
  return "text-center";
}
