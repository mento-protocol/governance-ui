import { useReadContract } from "wagmi";
import { Address } from "viem";
import { GovernorABI } from "@/app/abis/Governor";
import { Proposal } from "@/app/graphql";
import { useContracts } from "@/app/hooks/useContracts";

const useVoteReceipt = ({
  address,
  proposalId,
}: {
  address: Address | undefined;
  proposalId: Proposal["proposalId"];
}) => {
  console.log({ address, proposalId, hello: !!address });
  const contracts = useContracts();
  return useReadContract({
    abi: GovernorABI,
    address: contracts.MentoGovernor.address,
    functionName: "getReceipt",
    args: [proposalId, address!],
    query: { enabled: !!address },
  });
};

export default useVoteReceipt;
