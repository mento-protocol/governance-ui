import { useMemo } from "react";
import { formatUnits } from "viem";
import { useBlockNumber } from "wagmi";
import { Card } from "@/components/_shared";
import useGetProposals from "@/lib/contracts/governor/useGetProposals";
import useLockingTotalSupply from "@/lib/contracts/locking/useLockingTotalSupply";
import useLockingGetWeek from "@/lib/contracts/locking/useLockingGetWeek";
import useGetAllLocks from "@/lib/contracts/locking/useGetAllLocks";

const ProposalSummaryComponent = () => {
  const { totalSupply } = useLockingTotalSupply();
  const { currentWeek } = useLockingGetWeek();
  const { locks } = useGetAllLocks();
  const { proposals } = useGetProposals();

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
      <div className="flex flex-wrap gap-x6 m-x4 mr-x6 ml-x6 justify-between">
        <div className="flex flex-col justify-center place-items-center gap-x2">
          <div className="font-size-x6 line-height-x6 font-medium">
            {proposalCount}
          </div>
          <div className="font-size-x3">Total proposals</div>
        </div>
        <div className="flex flex-col justify-center place-items-center gap-x2">
          <div className="font-size-x6 line-height-x6 font-medium">
            {activeProposalCount}
          </div>
          <div className="font-size-x3">Active proposals</div>
        </div>
        <div className="flex flex-col justify-center place-items-center gap-x2">
          <div className="font-size-x6 line-height-x6 font-medium">
            {getActiveVoters}
          </div>
          <div className="font-size-x3">Voters</div>
        </div>
        <div className="flex flex-col justify-center place-items-center gap-x2">
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
