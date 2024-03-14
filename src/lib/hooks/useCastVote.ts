import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useContracts } from "@lib/hooks/useContracts";
import { GovernorABI } from "@lib/abi/Governor";

const useCastVote = () => {
  const contracts = useContracts();
  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const castVote = (proposalId: number, support: number) => {
    const params = {
      address: contracts.MentoGovernor.address,
      abi: GovernorABI,
      functionName: "castVote",
      args: [BigInt(proposalId).valueOf(), support],
    } as const;

    writeContract(params);
  };

  return {
    hash: data,
    castVote,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useCastVote;
