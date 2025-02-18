import { useMemo } from "react";
import useProposals from "@/lib/contracts/governor/useProposals";
import useAllLocks from "@/lib/contracts/locking/useAllLocks";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import useTokens from "@/lib/contracts/useTokens";
import { ensureChainId } from "@/lib/helpers/ensureChainId";
import NumbersService from "@/lib/helpers/numbers.service";
import { formatUnits } from "viem";
import { useAccount, useBlockNumber } from "wagmi";
import { Card } from "@mento-protocol/ui-toolkit";

export const ProposalSummaryComponent = () => {
  return (
    <Card
      className="mt-8 grid grid-cols-2 items-start justify-between gap-x6 pb-5 pt-10 md:grid-cols-4 md:pb-8"
      block
    >
      <ContractDataGrid />
    </Card>
  );
};

const ContractDataGrid = () => {
  const {
    veMentoContractData: { totalSupply },
  } = useTokens();
  const { currentWeek } = useLockingWeek();
  const { locks, loading } = useAllLocks();
  const { proposals, isLoading } = useProposals();
  const { chainId } = useAccount();

  const currentBlockNumber = useBlockNumber({
    watch: true,
    chainId: ensureChainId(chainId),
  });

  const proposalsEndBlocks: Array<BigInt> = proposals.map(
    (proposal) => proposal.endBlock,
  );

  const proposalCount = useMemo(() => {
    return proposalsEndBlocks.length;
  }, [proposalsEndBlocks]);

  const activeProposalCount = useMemo(() => {
    return proposalsEndBlocks.filter(
      (proposalEndBlock) =>
        !currentBlockNumber.data ||
        BigInt(proposalEndBlock.toString()) > BigInt(currentBlockNumber.data),
    ).length;
  }, [proposalsEndBlocks, currentBlockNumber]);

  const getTotalSupplyParsed = useMemo(() => {
    const totalSupplyNumber = Number(formatUnits(totalSupply || BigInt(0), 18));
    return NumbersService.parseNumericValue(Math.floor(totalSupplyNumber));
  }, [totalSupply]);

  const getActiveVoters = useMemo(() => {
    if (!locks || !currentWeek) return 0;

    const uniqueVoters = new Set<string>();
    locks.forEach((lock) => {
      const { time, cliff, slope } = lock;
      if (parseInt(time) + cliff + slope > currentWeek)
        uniqueVoters.add(lock.owner.id);
    });

    return uniqueVoters.size;
  }, [currentWeek, locks]);

  if (isLoading || loading) return <ContractDataGridSkeleton />;

  return (
    <>
      <ContractData value={proposalCount} label="Total Proposals" />
      <ContractData value={activeProposalCount} label="Active Proposals" />
      <ContractData value={getActiveVoters} label="Registered Voters" />
      <ContractData
        value={getTotalSupplyParsed}
        label="Total veMento Voting Power"
      />
    </>
  );
};

const ContractData = ({
  value,
  label,
}: {
  value: number | string;
  label: string;
  isLoading?: boolean;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center md:gap-2">
      <div className="text-[22px] font-medium md:text-[32px]">{value}</div>
      <div className="max-w-32 text-[18px]">{label}</div>
    </div>
  );
};

const ContractDataSkeleton = ({
  label,
  noOfDigits = 3,
}: {
  label: string;
  noOfDigits?: number;
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-1 text-center md:gap-2">
      <div className="animate-pulse rounded-[4px] bg-gray-300 text-[22px] font-medium md:text-[32px]">
        <span className="opacity-0">
          {noOfDigits.toString().padStart(noOfDigits, "0")}
        </span>
      </div>
      <div className="max-w-32 text-[18px]">{label}</div>
    </div>
  );
};

const ContractDataGridSkeleton = () => {
  return (
    <>
      <ContractDataSkeleton noOfDigits={2} label="Total Proposals" />
      <ContractDataSkeleton noOfDigits={2} label="Active Proposals" />
      <ContractDataSkeleton label="Registered Voters" />
      <ContractDataSkeleton label="Total veMento Voting Power" />
    </>
  );
};
