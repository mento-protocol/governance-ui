import { GovernorABI } from "@/lib/abi/Governor";
import { useContracts } from "@/lib/contracts/useContracts";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";
import { useReadContract } from "wagmi";

export const useProposalThreshold = () => {
  const ensuredChainId = useEnsureChainId();
  const { MentoGovernor } = useContracts();

  const { data: proposalThreshold } = useReadContract({
    address: MentoGovernor.address,
    abi: GovernorABI,
    functionName: "proposalThreshold",
    args: [],
    chainId: ensuredChainId,
  });

  return {
    proposalThreshold: proposalThreshold ?? 0n,
  };
};
