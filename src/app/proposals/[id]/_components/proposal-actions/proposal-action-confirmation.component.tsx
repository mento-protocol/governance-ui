import { Loader } from "@/components/_shared";
import WalletHelper from "@/lib/helpers/wallet.helper";
import { ProposalActionTitle } from "./proposal-action-title";
import { Proposal } from "@/lib/graphql";

export const ProposalActionConfirmation = ({
  proposalId,
  title,
  subtitle,
}: {
  proposalId: Proposal["proposalId"];
  title: string;
  subtitle: string;
}) => {
  return (
    <>
      <ProposalActionTitle>{title}</ProposalActionTitle>
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Confirm</span>
        <Loader
          isCenter
          className="w-[100%]"
          logoColor="fill-black dark:fill-mento-cyan"
        />
        <>
          <div className="flex flex-col items-center justify-center gap-1 text-[0.875rem]">
            <span>{subtitle}</span>
            <span className="font-semibold">{`${WalletHelper.getShortAddress(proposalId)}`}</span>
          </div>
        </>
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Proceed in your wallet
        </span>
      </div>
    </>
  );
};
