import React, { ReactNode, createContext, useContext } from "react";

import { useManageLockLogic } from "./hooks/useManageLockLogic";

import { ManageLockTxModal } from "./manage-lock-tx-modal";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";

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
  selectedDate: Date;
  isValid: boolean;
  lockToManage: LockWithExpiration;
  submit: ({ onSuccess }: { onSuccess?: () => void }) => void;
  maxExtensionWeeks: number;
  disabledDays: any[]; // You might want to define a more specific type here
  onDateSelection: (date: Date) => void;
  shouldUpdateLockingAmount: boolean;
  setShouldUpdateLockingAmount: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  retry: () => void;
  approvalStatus: MANAGE_LOCK_APPROVAL_STATUS;
  manageLockTxStatus: MANAGE_LOCK_TX_STATUS;
  needsApproval: boolean;
  isTxModalOpen: boolean;
  setIsTxModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAwaitingUserSignature: boolean;
  isSubmitting: boolean;
  canManageLocks: boolean;
}

const ManageLockContext = createContext<IManageLockContext | undefined>(
  undefined,
);

interface IManageLockProvider {
  children: ReactNode | ReactNode[];
  onLockConfirmation?: () => void;
  lockToManage: LockWithExpiration;
  className?: string;
}

export const ManageLockProvider = ({
  children,
  lockToManage,
  className,
}: IManageLockProvider) => {
  const manageLockLogic = useManageLockLogic(lockToManage);

  return (
    <ManageLockContext.Provider value={manageLockLogic}>
      <form className={className}>{children}</form>
      <ManageLockTxModal
        isOpen={manageLockLogic.isTxModalOpen}
        onClose={() => {
          manageLockLogic.setIsTxModalOpen(false);
          manageLockLogic.reset();
        }}
        {...manageLockLogic}
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
