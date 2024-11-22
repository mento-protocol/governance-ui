import { formatUnits } from "viem";
import useTokens from "@/lib/contracts/useTokens";
import NumbersService from "@/lib/helpers/numbers.service";
import { Proposal } from "@/lib/graphql";
import { useVotingPowerForProposal } from "@/lib/contracts/governor/useVotingPowerForProposal";
import ValueLoaderSkeleton from "@/components/_shared/value-loader-skeleton/value-loader-skeleton.component";

export const VotingPowerForProposal = ({
  proposal,
}: {
  proposal: Proposal;
}) => {
  const { data: votingPower, isLoading } = useVotingPowerForProposal(proposal);
  const { veMentoBalance } = useTokens();

  return (
    <div className="flex flex-col items-center gap-x2 font-fg">
      <div className="text-[1.125rem] text-[#A8A8A8] dark:text-[#AAB3B6]">
        Your voting power
      </div>
      {isLoading ? (
        <ValueLoaderSkeleton className="!h-[2rem] min-w-[150px]">
          0.00 veMENTO
        </ValueLoaderSkeleton>
      ) : (
        <div className="text-[2rem] leading-[2rem]">
          {`${NumbersService.parseNumericValue(
            formatUnits(votingPower ?? 0n, veMentoBalance.decimals),
          )} veMENTO`}
        </div>
      )}
    </div>
  );
};
