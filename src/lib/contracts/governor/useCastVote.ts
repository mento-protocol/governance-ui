import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useContracts } from "@/lib/contracts/useContracts";
import { GovernorABI } from "@/lib/abi/Governor";

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

  const castVote = useCallback(
    (proposalId: number, support: number) => {
      writeContract({
        address: contracts.MentoGovernor.address,
        abi: GovernorABI,
        functionName: "castVote",
        args: [BigInt(proposalId).valueOf(), support],
      } as const);
    },
    [contracts.MentoGovernor.address, writeContract],
  );

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
