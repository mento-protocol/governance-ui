import React, { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, erc20Abi } from "viem";
import { WriteContractErrorType } from "wagmi/actions";

const useApprove = ({
  onConfirmation,
}: { onConfirmation?: () => void } = {}) => {
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
      pollingInterval: 1000,
    });

  React.useEffect(() => {
    if (isConfirmed && onConfirmation) {
      onConfirmation();
      restWrite.reset();
    }
  }, [isConfirmed, onConfirmation, restWrite]);

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
