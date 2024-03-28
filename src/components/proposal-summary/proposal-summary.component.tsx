import { useMemo } from "react";
import { formatUnits } from "viem";
import { useBlockNumber } from "wagmi";
import { Card } from "@/components/_shared";
import useProposals from "@/lib/contracts/governor/useProposals";
import useLockingTotalSupply from "@/lib/contracts/locking/useLockingTotalSupply";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import useAllLocks from "@/lib/contracts/locking/useAllLocks";

const ProposalSummaryComponent = () => {
  const { totalSupply } = useLockingTotalSupply();
  const { currentWeek } = useLockingWeek();
  const { locks } = useAllLocks();
  const { proposals } = useProposals();

  const currentBlockNumber = useBlockNumber();

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
    return Number(formatUnits(totalSupply || BigInt(0), 18)).toLocaleString();
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

  return (
    <Card className="mt-8" block>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x6 justify-between">
        <div className="flex flex-col justify-center place-items-center">
          <div className="font-size-x6 line-height-x6 font-medium">
            {proposalCount}
          </div>
          <div className="font-size-x3">Total proposals</div>
        </div>
        <div className="flex flex-col justify-center place-items-center">
          <div className="font-size-x6 line-height-x6 font-medium">
            {activeProposalCount}
          </div>
          <div className="font-size-x3">Active proposals</div>
        </div>
        <div className="flex flex-col justify-center place-items-center">
          <div className="font-size-x6 line-height-x6 font-medium">
            {getActiveVoters}
          </div>
          <div className="font-size-x3">Voters</div>
        </div>
        <div className="flex flex-col justify-center place-items-center">
          <div className="font-size-x6 line-height-x6 font-medium">
            {getTotalSupplyParsed}
          </div>
          <div className="font-size-x3">Total Supply</div>
        </div>
      </div>
    </Card>
  );
};

export default ProposalSummaryComponent;