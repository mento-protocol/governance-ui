import WalletHelper from "@/lib/helpers/wallet.helper";
import { Loader } from "@/components/_shared";
import { Proposal } from "@/lib/graphql";
import { VoteTypePill } from "./vote-type-pill";
import { ProposalActionTitle } from "../proposal-action-title";

export const VoteConfirmation = ({
  voteType,
  proposalId,
}: {
  voteType: number;
  proposalId: Proposal["proposalId"];
}) => {
  return (
    <>
      <ProposalActionTitle />
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Confirm your vote</span>
        <Loader
          isCenter
          className="w-[100%]"
          logoColor="fill-mento-dark dark:fill-mento-cyan"
        />
        <>
          <div className="flex flex-col items-center justify-center gap-1 text-[0.875rem]">
            <div className="flex items-center justify-center gap-1">
              <span>{`Voting `}</span>
              <span className="flex items-center justify-center">
                <VoteTypePill voteType={voteType} />
              </span>
              <span>on</span>
            </div>
            <div>
              <span>Proposal </span>
              <span className="font-semibold">{`${WalletHelper.getShortAddress(proposalId)}`}</span>
            </div>
          </div>
        </>
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Proceed in your wallet
        </span>
      </div>
    </>
  );
};
