import { GovernorABI } from "@/lib/abi/Governor";
import { useContracts } from "@/lib/contracts/useContracts";
import { useReadContract } from "wagmi";

export const useProposalThreshold = () => {
  const { MentoGovernor } = useContracts();

  const { data: proposalThreshold } = useReadContract({
    address: MentoGovernor.address,
    abi: GovernorABI,
    functionName: "proposalThreshold",
    args: [],
  });

  return {
    proposalThreshold: proposalThreshold ?? 0n,
  };
};
