import { useReadContract } from "wagmi";
import { Address } from "viem";
import { GovernorABI } from "@/lib/abi/Governor";
import { useContracts } from "@/lib/contracts/useContracts";
import { useEnsureChainId } from "@/lib/hooks/useEnsureChainId";

const useVoteReceipt = ({
  address,
  proposalId,
}: {
  address: Address | undefined;
  proposalId: bigint;
}) => {
  const contracts = useContracts();
  const ensuredChainId = useEnsureChainId();

  return useReadContract({
    abi: GovernorABI,
    address: contracts.MentoGovernor.address,
    functionName: "getReceipt",
    args: [proposalId, address!],
    query: { enabled: !!address },
    chainId: ensuredChainId,
  });
};

export default useVoteReceipt;
