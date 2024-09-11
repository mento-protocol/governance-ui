import React from "react";
import { BlockExplorerLink } from "@/components/_shared";
import { SuccessIcon } from "@/components/_icons";
import { ProposalActionTitle } from "./proposal-action-title";

interface ProposalActionStatusProps {
  title: string;
  status: string;
  hash?: `0x${string}`;
}

export const ProposalActionConfirming: React.FC<ProposalActionStatusProps> = ({
  title,
  status,
  hash,
}) => {
  return (
    <>
      <ProposalActionTitle>{title}</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">{status}</span>
        <SuccessIcon className="mx-auto h-20 w-20" />
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Processing transaction. This may take a few moments.
        </span>
        {hash && (
          <BlockExplorerLink type="tx" item={hash}>
            View on explorer
          </BlockExplorerLink>
        )}
      </div>
    </>
  );
};

export const ProposalActionConfirmed: React.FC<ProposalActionStatusProps> = ({
  title,
  status,
  hash,
}) => {
  return (
    <>
      <ProposalActionTitle>{title}</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">{status}</span>
        <SuccessIcon className="mx-auto h-20 w-20" />
        {hash && (
          <BlockExplorerLink type="tx" item={hash}>
            View on explorer
          </BlockExplorerLink>
        )}
      </div>
    </>
  );
};
