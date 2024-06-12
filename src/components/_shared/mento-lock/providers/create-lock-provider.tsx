import { ReactNode, createContext, useContext } from "react";
import useCreateLockOnChain from "@/lib/contracts/locking/useLockMento";
import { useAllowance } from "@/lib/contracts/mento/useAllowance";
import useApprove from "@/lib/contracts/mento/useApprove";
import { useContracts } from "@/lib/contracts/useContracts";
import React from "react";
import { parseEther } from "viem";
import { useAccount } from "wagmi";
import {
  DEFAULT_CLIFF,
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "../constants";
import { useFormContext } from "react-hook-form";
import { TxModal } from "../../tx-modal/tx-modal.component";

export enum CREATE_LOCK_TX_STATUS {
  PENDING = "PENDING",
  CONFIRMING_LOCK_TX = "CONFIRMING_LOCK_TX",
  CONFIRMING_APPROVE_TX = "CONFIRMING_APPROVE_TX",
  AWAITING_SIGNATURE = "AWAITING_SIGNATURE",
  UNKNOWN = "UNKNOWN",
  ERROR = "ERROR",
}
export enum CREATE_LOCK_APPROVAL_STATUS {
  NOT_APPROVED = "NOT_APPROVED",
  APPROVED = "APPROVED",
  UNKNOWN = "UNKNOWN",
}

export interface ICreateLockContext {
  needsApproval: boolean;
  createLock: () => void;
  reset: () => void;
  retry: () => void;
  approve: ReturnType<typeof useApprove>;
  lock: ReturnType<typeof useCreateLockOnChain>;
  allowance: ReturnType<typeof useAllowance>;
  CreateLockTxStatus: CREATE_LOCK_TX_STATUS;
  CreateLockApprovalStatus: CREATE_LOCK_APPROVAL_STATUS;
}

const CreateLockContext = createContext<ICreateLockContext | undefined>(
  undefined,
);

interface ICreateLockProvider {
  children: ReactNode | ReactNode[];
  onLockConfirmation?: () => void;
}

export const CreateLockProvider = ({
  children,
  onLockConfirmation,
}: ICreateLockProvider) => {
  const { watch, reset: resetForm } = useFormContext();
  const [isTxModalOpen, setIsTxModalOpen] = React.useState(false);

  const { address } = useAccount();
  const amount = watch(LOCKING_AMOUNT_FORM_KEY);
  const slope = watch(LOCKING_DURATION_FORM_KEY);

  const contracts = useContracts();
  const parsedAmount = parseEther(amount);

  const lock = useCreateLockOnChain({
    onLockConfirmation,
  });
  const allowance = useAllowance({
    owner: address,
    spender: contracts.Locking.address,
  });

  const resetAll = React.useCallback(() => {
    setIsTxModalOpen(false);
    resetForm();
  }, [resetForm]);

  const lockMento = React.useCallback(() => {
    lock.lockMento({
      account: address!,
      amount: parsedAmount,
      delegate: address!,
      slope,
      cliff: DEFAULT_CLIFF,
      onSuccess: () => {
        resetAll();
      },
    });
  }, [address, lock, parsedAmount, resetAll, slope]);

  const approve = useApprove({ onConfirmation: lockMento });

  const needsApproval = React.useMemo(() => {
    if (!allowance.data) return true;
    return allowance?.data < parsedAmount;
  }, [allowance.data, parsedAmount]);

  const CreateLockTxStatus = React.useMemo(() => {
    if (approve.error || lock.error) return CREATE_LOCK_TX_STATUS.ERROR;
    if (approve.isAwaitingUserSignature || lock.isAwaitingUserSignature)
      return CREATE_LOCK_TX_STATUS.AWAITING_SIGNATURE;
    if (approve.isConfirming)
      return CREATE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX;
    if (lock.isConfirming) return CREATE_LOCK_TX_STATUS.CONFIRMING_LOCK_TX;

    return CREATE_LOCK_TX_STATUS.UNKNOWN;
  }, [
    approve.error,
    approve.isAwaitingUserSignature,
    approve.isConfirming,
    lock.error,
    lock.isAwaitingUserSignature,
    lock.isConfirming,
  ]);

  const CreateLockApprovalStatus = React.useMemo(() => {
    return needsApproval
      ? CREATE_LOCK_APPROVAL_STATUS.NOT_APPROVED
      : CREATE_LOCK_APPROVAL_STATUS.APPROVED;
  }, [needsApproval]);

  const createLock = React.useCallback(() => {
    lock.reset();
    approve.reset();
    setIsTxModalOpen(true);
    if (!needsApproval) {
      lockMento();
    } else {
      approve.approveMento(contracts.Locking.address, parsedAmount);
    }
  }, [
    lock,
    approve,
    needsApproval,
    lockMento,
    contracts.Locking.address,
    parsedAmount,
  ]);

  const reset = React.useCallback(() => {
    approve.reset();
    lock.reset();
  }, [approve, lock]);
  const retry = React.useCallback(() => {
    createLock();
  }, [createLock]);

  const TxMessage = () => {
    return (
      <div className="flex min-h-4 flex-col gap-4">
        {CreateLockApprovalStatus ===
        CREATE_LOCK_APPROVAL_STATUS.NOT_APPROVED ? (
          <span>Approve MENTO</span>
        ) : (
          <span>Lock MENTO</span>
        )}
        {CreateLockTxStatus === CREATE_LOCK_TX_STATUS.AWAITING_SIGNATURE ? (
          <>Continue in wallet</>
        ) : CreateLockTxStatus === CREATE_LOCK_TX_STATUS.CONFIRMING_LOCK_TX ||
          CreateLockTxStatus === CREATE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX ? (
          <>Confirming...</>
        ) : null}
      </div>
    );
  };

  return (
    <CreateLockContext.Provider
      value={{
        reset,
        retry,
        CreateLockTxStatus,
        CreateLockApprovalStatus,
        createLock,
        needsApproval,
        approve,
        lock,
        allowance,
      }}
    >
      {children}
      <TxModal
        isOpen={isTxModalOpen}
        onClose={() => {
          setIsTxModalOpen(false);
          reset();
        }}
        error={CreateLockTxStatus === CREATE_LOCK_TX_STATUS.ERROR}
        title="Create Lock"
        retry={retry}
        message={<TxMessage />}
      />
    </CreateLockContext.Provider>
  );
};

export function useCreateLock() {
  const context = useContext(CreateLockContext);
  if (context === undefined) {
    throw new Error("useCreateLock must be used within a CreateLockProvider");
  }
  return context;
}
