import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, erc20Abi } from "viem";
import { WriteContractErrorType } from "wagmi/actions";

const useApprove = () => {
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

  const approveMento = useCallback(
    (
      target: Address,
      amount: bigint,
      onSuccess?: () => void,
      onError?: (error?: WriteContractErrorType) => void,
    ) => {
      writeContract(
        {
          address: contracts.MentoToken.address,
          abi: erc20Abi,
          functionName: "approve",
          args: [target, amount],
        },
        {
          onSuccess,
          onError,
        },
      );
    },
    [contracts.MentoToken.address, writeContract],
  );

  return {
    hash: data,
    approveMento,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useApprove;
