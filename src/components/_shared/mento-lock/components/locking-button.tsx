import { useFormContext } from "react-hook-form";
import {
  CREATE_LOCK_APPROVAL_STATUS,
  CREATE_LOCK_TX_STATUS,
  useCreateLock,
} from "../providers/create-lock-provider";
import { cn } from "@mento-protocol/ui-toolkit";
import React from "react";
import { LOCKING_AMOUNT_FORM_KEY } from "@/lib/constants/locking";
import { Button } from "@mento-protocol/ui-toolkit";

export const LockingButton = () => {
  const { createLock, CreateLockTxStatus, CreateLockApprovalStatus } =
    useCreateLock();

  const {
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useFormContext();

  const amount = watch(LOCKING_AMOUNT_FORM_KEY);

  const isBalanceInsufficient = errors.amountToLock?.type === "max";

  const content = React.useMemo(() => {
    if (amount === "") {
      return <>Enter Amount</>;
    }
    if (isBalanceInsufficient) {
      return <>Insufficient Balance</>;
    }
    if (CreateLockApprovalStatus === CREATE_LOCK_APPROVAL_STATUS.NOT_APPROVED) {
      return <>Approve MENTO</>;
    }

    return <>Lock MENTO</>;
  }, [CreateLockApprovalStatus, amount, isBalanceInsufficient]);

  const shouldButtonBeDisabled =
    !isValid ||
    isBalanceInsufficient ||
    CreateLockTxStatus === CREATE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX ||
    CreateLockTxStatus === CREATE_LOCK_TX_STATUS.AWAITING_SIGNATURE;

  return (
    <Button
      fullwidth
      className={cn(
        "!mt-x6",
        isBalanceInsufficient &&
          "pointer-events-none w-full cursor-not-allowed",
      )}
      disabled={shouldButtonBeDisabled}
      theme={isBalanceInsufficient ? "danger" : "primary"}
      onClick={(e) => {
        handleSubmit(() => {
          createLock();
        })(e);
      }}
    >
      {content}
    </Button>
  );
};
