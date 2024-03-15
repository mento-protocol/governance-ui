import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useContracts } from "@/app/hooks/useContracts";
import { GovernorABI } from "../abis/Governor";

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
