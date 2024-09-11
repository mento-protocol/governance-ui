import { useCallback } from "react";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useContracts } from "@/lib/contracts/useContracts";
import { GovernorABI } from "@/lib/abi/Governor";
import { WriteContractErrorType } from "wagmi/actions";
import { useQueryClient } from "@tanstack/react-query";
import { ProposalQueryKey } from "@/lib/contracts/governor/useProposal";

const useExecuteProposal = () => {
  const queryClient = useQueryClient();
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

  const executeProposal = useCallback(
    (
      proposalId: bigint,
      onSuccess?: () => void,
      onError?: (error?: WriteContractErrorType) => void,
    ) => {
      writeContract(
        {
          address: contracts.MentoGovernor.address,
          abi: GovernorABI,
          functionName: "execute",
          args: [BigInt(proposalId).valueOf()],
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [ProposalQueryKey],
            });
            onSuccess && onSuccess();
          },
          onError,
        },
      );
    },
    [contracts.MentoGovernor.address, queryClient, writeContract],
  );

  return {
    hash: data,
    executeProposal,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useExecuteProposal;
