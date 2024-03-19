import { LockingABI } from "@/app/abis/Locking";
import { GetAllLocks, GetProposals, Lock, Proposal } from "@/app/graphql";
import NumbersService from "@/app/helpers/numbers.service";
import { useContracts } from "@/app/hooks/useContracts";
import { useSuspenseQuery } from "@apollo/client";
import { Card } from "@components/_shared";
import { useMemo } from "react";
import { formatUnits } from "viem";
import { useBlockNumber, useChainId, useReadContract } from "wagmi";

const ProposalSummaryComponent = () => {
  const chainId = useChainId();
  const contracts = useContracts();
  const { data } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposals, {
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
  });

  const { data: totalSupply } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "totalSupply",
    args: [],
  });
  const {
    data: { locks },
  } = useSuspenseQuery<{ locks: Lock[] }>(GetAllLocks);
  const { data: currentWeek } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getWeek",
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
    return Number(formatUnits(totalSupply || 0n, 18)).toLocaleString(
      undefined,
      {
        maximumFractionDigits: 0,
      },
    );
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
