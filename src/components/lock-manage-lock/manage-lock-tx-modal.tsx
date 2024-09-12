import React from "react";
import { TxModal } from "../_shared/tx-modal/tx-modal.component";
import {
  MANAGE_LOCK_TX_STATUS,
  MANAGE_LOCK_APPROVAL_STATUS,
} from "./manage-lock.provider";

interface ManageLockTxModalProps {
  isOpen: boolean;
  onClose: () => void;
  approvalStatus: MANAGE_LOCK_APPROVAL_STATUS;
  manageLockTxStatus: MANAGE_LOCK_TX_STATUS;
  retry: () => void;
}

export const ManageLockTxModal: React.FC<ManageLockTxModalProps> = ({
  isOpen,
  onClose,
  approvalStatus,
  manageLockTxStatus,
  retry,
}) => {
  const TxMessage = () => (
    <div className="flex min-h-4 flex-col gap-4">
      {approvalStatus === MANAGE_LOCK_APPROVAL_STATUS.NOT_APPROVED ? (
        <span>Approve MENTO</span>
      ) : (
        <span>Updating MENTO Lock</span>
      )}
      {manageLockTxStatus === MANAGE_LOCK_TX_STATUS.AWAITING_SIGNATURE ? (
        <>Continue in wallet</>
      ) : manageLockTxStatus === MANAGE_LOCK_TX_STATUS.CONFIRMING_RELOCK_TX ||
        manageLockTxStatus === MANAGE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX ? (
        <>Confirming...</>
      ) : null}
    </div>
  );

  return (
    <TxModal
      isOpen={isOpen}
      onClose={onClose}
      error={manageLockTxStatus === MANAGE_LOCK_TX_STATUS.ERROR}
      title="Manage Lock"
      retry={retry}
      message={<TxMessage />}
    />
  );
};
