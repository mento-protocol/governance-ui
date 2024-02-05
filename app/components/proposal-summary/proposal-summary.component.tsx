import { GetProposals } from "@/app/graphql";
import { useBlockNumber, useReadContract } from "wagmi";
import { lockingContract } from "@/app/helpers/contracts";
import { LockingABI } from "@/app/abis/Locking";
import { useMemo } from "react";
import { useSuspenseQuery } from "@apollo/client";
import NumbersService from "@/app/helpers/numbers.service";
import { Card } from "@components/_shared";
import { formatUnits } from "viem";

const ProposalSummaryComponent = () => {
  const { data } = useSuspenseQuery(GetProposals);
  const { data: totalSupply } = useReadContract({
    address: lockingContract,
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
    const formattedTotalSupply = formatUnits(totalSupply || 0n, 12);
    const decimalsSplit = formattedTotalSupply.split(".");

    return `${decimalsSplit[0]}${decimalsSplit[1] ? `.${decimalsSplit[1].slice(0, 3)}` : ""}T`;
  }, [totalSupply]);

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
            {NumbersService.parseNumericValue(2097, 3)}
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
