import WalletHelper from "@/lib/helpers/wallet.helper";
import { Card, Loader, VotingCardTitle } from "@/components/_shared";
import { Proposal } from "@/lib/graphql";
import { VoteTypePill } from "../vote-cast-vote";

export const VoteConfirmation = ({
  voteType,
  proposalId,
}: {
  voteType: number;
  proposalId: Proposal["proposalId"];
}) => {
  return (
    <Card>
      <VotingCardTitle />
      <div className="mt-x2 flex flex-col gap-x3 text-center">
        <span className="text-md">Confirm your vote</span>
        <Loader isCenter />
        {voteType && (
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
            <div>
              <span>Proposal </span>
              <span className="font-semibold">{`${WalletHelper.getShortAddress(proposalId)}`}</span>
            </div>
          </>
        )}
        <span className="text-sm text-[#A8A8A8] dark:text-[#AAB3B6]">
          Proceed in your wallet
        </span>
      </div>
    </Card>
  );
};
