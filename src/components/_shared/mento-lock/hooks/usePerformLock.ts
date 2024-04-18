import useLockMentoHook from "@/lib/contracts/locking/useLockMento";
import { useAllowance } from "@/lib/contracts/mento/useAllowance";
import useApprove from "@/lib/contracts/mento/useApprove";
import { useContracts } from "@/lib/contracts/useContracts";
import React from "react";
import { Address, parseEther } from "viem";
import { useChainId } from "wagmi";
import { DEFAULT_CLIFF } from "../constants";

export const usePerformLock = ({
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
  const approve = useApprove();
  const lock = useLockMentoHook({
    onLockConfirmation,
  });

  const parsedAmount = parseEther(amount);

  const { approveMento } = approve;
  const { lockMento: executeLock } = lock;

  const chainId = useChainId();
  const allowance = useAllowance({
    chainId,
    owner: account,
    spender: contracts.Locking.address,
  });

  const needsApproval = React.useMemo(() => {
    if (!allowance.data) return true;
    return allowance?.data < parsedAmount;
  }, [allowance.data, parsedAmount]);

  const lockMento = React.useCallback(
    ({
      onError,
      onSuccess,
    }: {
      onError?: () => void;
      onSuccess?: () => void;
    } = {}) => {
      executeLock({
        account,
        amount: parsedAmount,
        delegate,
        slope,
        cliff: DEFAULT_CLIFF,
        onError,
        onSuccess,
      });
    },
    [account, delegate, executeLock, parsedAmount, slope],
  );

  const approveThenLock = React.useCallback(() => {
    approveMento(contracts.Locking.address, parsedAmount, () => {
      lockMento();
    });
  }, [approveMento, contracts.Locking.address, lockMento, parsedAmount]);

  const performLock = React.useCallback(
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
        approveThenLock();
      }
    },
    [needsApproval, lockMento, approveThenLock],
  );
  return {
    lockMento: performLock,
    canLock: false,
    needsApproval,
    approve,
    lock,
    allowance,
  };
};
