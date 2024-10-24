import { ReactNode, createContext, useContext } from "react";
import { useAllowance } from "@/lib/contracts/mento/useAllowance";
import useApprove from "@/lib/contracts/mento/useApprove";
import { useContracts } from "@/lib/contracts/useContracts";
import React from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";

import { useFormContext } from "react-hook-form";
import {
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
  MAX_LOCKING_DURATION_WEEKS,
} from "@/lib/constants/locking";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import { differenceInWeeks } from "date-fns";

import { ExtendedLock } from "@/lib/hooks/useLockInfo";
import { TxModal } from "../_shared/tx-modal/tx-modal.component";
import { ManageLockFormData } from "./hooks/useMangeLockForm";

export enum MANAGE_LOCK_TX_STATUS {
  PENDING = "PENDING",
  CONFIRMING_RELOCK_TX = "CONFIRMING_RELOCK_TX",
  CONFIRMING_APPROVE_TX = "CONFIRMING_APPROVE_TX",
  AWAITING_SIGNATURE = "AWAITING_SIGNATURE",
  UNKNOWN = "UNKNOWN",
  ERROR = "ERROR",
}
export enum MANAGE_LOCK_APPROVAL_STATUS {
  NOT_APPROVED = "NOT_APPROVED",
  APPROVED = "APPROVED",
  UNKNOWN = "UNKNOWN",
}

export interface IManageLockContext {
  needsApproval: boolean;
  manageLock: () => void;
  reset: () => void;
  retry: () => void;
  approve: ReturnType<typeof useApprove>;
  relock: ReturnType<typeof useRelockMento>;
  allowance: ReturnType<typeof useAllowance>;
  manageLockTxStatus: MANAGE_LOCK_TX_STATUS;
  approvalStatus: MANAGE_LOCK_APPROVAL_STATUS;
  lockToManage: ExtendedLock;
}

const ManageLockContext = createContext<IManageLockContext | undefined>(
  undefined,
);

interface IManageLockProvider {
  children: ReactNode | ReactNode[];
  onLockConfirmation?: () => void;
  lockToManage: ExtendedLock;
  className?: string;
}

export const ManageLockProvider = ({
  children,
  onLockConfirmation,
  lockToManage,
  className,
}: IManageLockProvider) => {
  const { watch, handleSubmit } = useFormContext<ManageLockFormData>();
  const [isTxModalOpen, setIsTxModalOpen] = React.useState(false);
  const { address } = useAccount();
  const contracts = useContracts();
  const allowance = useAllowance({
    owner: address,
    spender: contracts.Locking.address,
  });
  const { currentWeek: currentLockingWeek } = useLockingWeek();
  const { refetch } = useLocksByAccount({ account: address! });

  const additionalAmountToLock = watch(LOCKING_AMOUNT_FORM_KEY);
  const newExpirationDate = watch(LOCKING_DURATION_FORM_KEY);

  const parsedAdditionalAmountToLock = parseEther(additionalAmountToLock);
  const newSlope = React.useMemo(() => {
    if (!newExpirationDate) return 0;

    const currentSlope = lockToManage?.slope;
    const weeksPassed = Number(currentLockingWeek) - lockToManage?.time;
    const weeksAdded = differenceInWeeks(
      newExpirationDate,
      lockToManage?.expiration,
    );
    return Math.min(
      currentSlope - weeksPassed + weeksAdded,
      MAX_LOCKING_DURATION_WEEKS,
    );
  }, [
    currentLockingWeek,
    lockToManage?.expiration,
    lockToManage?.slope,
    lockToManage?.time,
    newExpirationDate,
  ]);

  const relock = useRelockMento({
    newSlope,
    additionalAmountToLock: parsedAdditionalAmountToLock,
    lock: lockToManage,
    onSuccess: () => {
      onLockConfirmation?.();
      refetch();
    },
  });

  const approve = useApprove({ onConfirmation: relock.relockMento });

  const needsApproval = React.useMemo(() => {
    if (parsedAdditionalAmountToLock === 0n) return false;
    if (!allowance.data) return true;
    return allowance?.data < parsedAdditionalAmountToLock;
  }, [allowance.data, parsedAdditionalAmountToLock]);

  const manageLockTxStatus = React.useMemo(() => {
    if (approve.error || relock.error) return MANAGE_LOCK_TX_STATUS.ERROR;
    if (approve.isAwaitingUserSignature || relock.isAwaitingUserSignature)
      return MANAGE_LOCK_TX_STATUS.AWAITING_SIGNATURE;
    if (approve.isConfirming)
      return MANAGE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX;
    if (relock.isConfirming) return MANAGE_LOCK_TX_STATUS.CONFIRMING_RELOCK_TX;

    return MANAGE_LOCK_TX_STATUS.UNKNOWN;
  }, [
    approve.error,
    approve.isAwaitingUserSignature,
    approve.isConfirming,
    relock.error,
    relock.isAwaitingUserSignature,
    relock.isConfirming,
  ]);

  const approvalStatus = React.useMemo(() => {
    return needsApproval
      ? MANAGE_LOCK_APPROVAL_STATUS.NOT_APPROVED
      : MANAGE_LOCK_APPROVAL_STATUS.APPROVED;
  }, [needsApproval]);

  const manageLock = React.useCallback(() => {
    setIsTxModalOpen(true);
    if (!needsApproval) {
      relock.relockMento();
    } else {
      approve.approveMento(
        contracts.Locking.address,
        parsedAdditionalAmountToLock,
      );
    }
  }, [
    relock,
    approve,
    needsApproval,
    contracts.Locking.address,
    parsedAdditionalAmountToLock,
  ]);

  const reset = React.useCallback(() => {
    approve.reset();
    relock.reset();
  }, [approve, relock]);

  const TxMessage = () => {
    return (
      <div className="flex min-h-4 flex-col gap-4">
        {approvalStatus === MANAGE_LOCK_APPROVAL_STATUS.NOT_APPROVED ? (
          <span>Approve MENTO</span>
        ) : (
          <span>Manage MENTO Lock</span>
        )}
        {manageLockTxStatus === MANAGE_LOCK_TX_STATUS.AWAITING_SIGNATURE ? (
          <>Continue in wallet</>
        ) : manageLockTxStatus === MANAGE_LOCK_TX_STATUS.CONFIRMING_RELOCK_TX ||
          manageLockTxStatus === MANAGE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX ? (
          <>Confirming...</>
        ) : null}
      </div>
    );
  };

  return (
    <ManageLockContext.Provider
      value={{
        reset,
        retry: manageLock,
        approvalStatus,
        manageLockTxStatus,
        needsApproval,
        approve,
        relock,
        allowance,
        manageLock,
        lockToManage,
      }}
    >
      <form className={className} onSubmit={handleSubmit(manageLock)}>
        {children}
      </form>
      <TxModal
        isOpen={isTxModalOpen}
        onClose={() => {
          setIsTxModalOpen(false);
          reset();
        }}
        error={manageLockTxStatus === MANAGE_LOCK_TX_STATUS.ERROR}
        title="Manage Lock"
        retry={manageLock}
        message={<TxMessage />}
      />
    </ManageLockContext.Provider>
  );
};

export function useManageLock() {
  const context = useContext(ManageLockContext);
  if (context === undefined) {
    throw new Error("useManageLock must be used within a ManageLockProvider");
  }
  return context;
}
