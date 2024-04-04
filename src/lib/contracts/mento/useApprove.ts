import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address, erc20Abi } from "viem";

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
    (target: Address, amount: bigint, onSuccess?: () => void) => {
      writeContract(
        {
          address: contracts.MentoToken.address,
          abi: erc20Abi,
          functionName: "approve",
          args: [target, amount],
        },
        {
          onSuccess,
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
