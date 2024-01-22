import { GetProposals } from "@/app/graphql";
import { useBlockNumber, useReadContract } from "wagmi";
import { lockingContract } from "@/app/helpers/contracts";
import { LockingABI } from "@/app/abis/Locking";
import IProposal from "@interfaces/proposal.interface";
import addDays from "date-fns/addDays";
import { useMemo } from "react";
import { useSuspenseQuery } from "@apollo/client";
import NumbersService from "@/app/helpers/numbers.service";
import { Card } from "@components/_shared";

const ProposalSummaryComponent = () => {
  const { data } = useSuspenseQuery(GetProposals);
  const { data: contractData } = useReadContract({
    address: lockingContract,
    abi: LockingABI,
    functionName: "totalSupply",
    args: [],
  });

  console.log(contractData);

  const currentBlockNumber = useBlockNumber();

  const proposals: Array<IProposal> = data?.proposals.map((proposal) => ({
    id: proposal.proposalId,
    title: proposal.metadata!.title,
    description: proposal.metadata!.description,
    state: proposal.state,
    endBlock: proposal.endBlock,
    votesTotal: 0,
    votesYes: 0,
    votesNo: 0,
    creator: "",
    createdAt: new Date(),
    deadlineAt: addDays(new Date(), 14),
  }));

  const proposalCount = useMemo(() => {
    return proposals.length;
  }, [proposals]);

  const activeProposalCount = useMemo(() => {
    console.log(currentBlockNumber.data);
    console.log(proposals.map((proposal) => proposal.endBlock));
    return proposals.filter(
      (proposal) =>
        !currentBlockNumber.data ||
        BigInt(proposal.endBlock.toString()) > BigInt(currentBlockNumber.data),
    ).length;
  }, [proposals, currentBlockNumber]);

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
            {NumbersService.parseNumericValue(
              +(contractData?.toString() || 0),
              3,
            )}
          </div>
          <div className="font-size-x3">
            Total veMento
            <br />
            Voting Power
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProposalSummaryComponent;
