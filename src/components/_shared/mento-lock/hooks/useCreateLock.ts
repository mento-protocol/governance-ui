import useCreateLockOnChain from "@/lib/contracts/locking/useLockMento";
import { useAllowance } from "@/lib/contracts/mento/useAllowance";
import useApprove from "@/lib/contracts/mento/useApprove";
import { useContracts } from "@/lib/contracts/useContracts";
import React from "react";
import { Address, parseEther } from "viem";
import { useChainId } from "wagmi";
import { DEFAULT_CLIFF } from "../constants";

export enum CREATE_LOCK_STATUS {
  NOT_APPROVED = "NOT_APPROVED",
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  CONFIRMING_TX = "CONFIRMING_TX",
  AWAITING_SIGNATURE = "AWAITING_SIGNATURE",
  UNKNOWN = "UNKNOWN",
}

export const useCreateLock = ({
  account,
  amount,
  delegate,
  slope,
  onLockConfirmation,
}: {
  account: Address;
  amount: string;
  delegate: Address;
  slope: number;
  onLockConfirmation?: () => void;
}) => {
  const contracts = useContracts();
  const chainId = useChainId();
  const parsedAmount = parseEther(amount);
  const lock = useCreateLockOnChain({
    onLockConfirmation,
  });
  const approve = useApprove();

  const lockMento = React.useCallback(
    ({
      onError,
      onSuccess,
    }: {
      onError?: () => void;
      onSuccess?: () => void;
    } = {}) => {
      lock.lockMento({
        account,
        amount: parsedAmount,
        delegate,
        slope,
        cliff: DEFAULT_CLIFF,
        onError,
        onSuccess,
      });
    },
    [account, delegate, lock, parsedAmount, slope],
  );

  React.useEffect(() => {
    if (approve.isConfirmed) {
      lockMento();
      approve.reset();
    }
  }, [approve, lockMento]);

  const allowance = useAllowance({
    chainId,
    owner: account,
    spender: contracts.Locking.address,
  });

  const needsApproval = React.useMemo(() => {
    if (!allowance.data) return true;
    return allowance?.data < parsedAmount;
  }, [allowance.data, parsedAmount]);

  const CreateLockStatus = React.useMemo(() => {
    if (needsApproval) return CREATE_LOCK_STATUS.NOT_APPROVED;
    if (approve.isAwaitingUserSignature || lock.isAwaitingUserSignature)
      return CREATE_LOCK_STATUS.AWAITING_SIGNATURE;
    return CREATE_LOCK_STATUS.UNKNOWN;
  }, [
    approve.isAwaitingUserSignature,
    lock.isAwaitingUserSignature,
    needsApproval,
  ]);

  const createLock = React.useCallback(
    ({
      onError,
      onSuccess,
    }: {
      onError?: () => void;
      onSuccess?: () => void;
    } = {}) => {
      if (!needsApproval) {
        lockMento({ onError, onSuccess });
      } else {
        approve.approveMento(contracts.Locking.address, parsedAmount, () => {
          lockMento();
        });
      }
    },
    [
      needsApproval,
      lockMento,
      approve,
      contracts.Locking.address,
      parsedAmount,
    ],
  );
  return {
    CreateLockStatus,
    createLock,
    needsApproval,
    approve,
    lock,
    allowance,
  };
};
