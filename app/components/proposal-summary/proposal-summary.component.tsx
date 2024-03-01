import { LockingABI } from "@/app/abis/Locking";
import { GetAllLocks, GetProposals, Lock, Proposal } from "@/app/graphql";
import NumbersService from "@/app/helpers/numbers.service";
import { useContracts } from "@/app/hooks/useContracts";
import { useSuspenseQuery } from "@apollo/client";
import { Card } from "@components/_shared";
import { useMemo } from "react";
import { formatUnits } from "viem";
import { useBlockNumber, useReadContract } from "wagmi";

const ProposalSummaryComponent = () => {
  const contracts = useContracts();
  const { data } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposals);
  const {
    data: { locks },
  } = useSuspenseQuery<{ locks: Lock[] }>(GetAllLocks);
  const { data: currentWeek } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
    args: [],
  });
  const { data: totalSupply } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "totalSupply",
    args: [],
  });

  const currentBlockNumber = useBlockNumber();

  const proposalsEndBlocks: Array<BigInt> = data?.proposals.map(
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
    return Number(formatUnits(totalSupply || 0n, 18)).toLocaleString();
  }, [totalSupply]);

  const getActiveVoters = useMemo(() => {
    if (!locks || !currentWeek) return 0;
    // Filter out expired locks
    const activeLocks = locks.filter(
      ({ time, cliff, slope }) => parseInt(time) + cliff + slope > currentWeek,
    );

    const uniqueVoters = new Set<string>();
    activeLocks.forEach((lock) => {
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
