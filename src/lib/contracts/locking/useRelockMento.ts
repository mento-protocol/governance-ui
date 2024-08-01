import { useCallback } from "react";
import { useContracts } from "@/lib/contracts/useContracts";
import {
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { LockingABI } from "@/lib/abi/Locking";
import { Address } from "viem";
import { WriteContractErrorType } from "wagmi/actions";

interface RelockMentoParams {
  id: bigint;
  newDelegate: Address;
  newAmount: bigint;
  newSlope: number;
  newCliff: number;
  onSuccess?: () => void;
  onError?: (error?: WriteContractErrorType) => void;
}

const useRelockMento = ({
  id,
  newDelegate,
  newAmount,
  newSlope,
  newCliff,
  onSuccess,
  onError,
}: RelockMentoParams) => {
  const contracts = useContracts();
  const {
    writeContract,
    isPending: isAwaitingUserSignature,
    data,
    ...restWrite
  } = useWriteContract();

  const simulation = useSimulateContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "relock",
    args: [id, newDelegate, newAmount, newSlope, newCliff],
  });

  console.log({ simulation });

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    });

  const relockMento = useCallback(() => {
    writeContract(
      {
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "relock",
        args: [id, newDelegate, newAmount, newSlope, newCliff],
      },
      {
        onSuccess,
        onError,
      },
    );
  }, [
    contracts.Locking.address,
    id,
    newAmount,
    newCliff,
    newDelegate,
    newSlope,
    onError,
    onSuccess,
    writeContract,
  ]);

  return {
    hash: data,
    relockMento,
    isAwaitingUserSignature,
    isConfirming,
    isConfirmed,
    ...restWrite,
  };
};

export default useRelockMento;
