import { useFormContext } from "react-hook-form";
import {
  CREATE_LOCK_APPROVAL_STATUS,
  CREATE_LOCK_TX_STATUS,
  useCreateLock,
} from "../providers/create-lock-provider";
import { LOCKING_AMOUNT_FORM_KEY } from "../constants";
import { Button } from "@/components/_shared/button/button.component";
import { cn } from "@/styles/helpers";
import React from "react";
import { useAccount } from "wagmi";
import { useLockInfo } from "@/lib/hooks/useLockInfo";

export const LockingButton = () => {
  const { address } = useAccount();

  const { createLock, CreateLockTxStatus, CreateLockApprovalStatus } =
    useCreateLock();

  const {
    watch,
    formState: { isValid, errors },
    handleSubmit,
  } = useFormContext();

  const { activeLocks } = useLockInfo(address);

  const hasActiveLocks = React.useMemo(() => {
    return activeLocks.length > 0;
  }, [activeLocks]);

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

    if (hasActiveLocks) {
      return <>You have an existing lock, re-lock above </>;
    }
    return <>Lock MENTO</>;
  }, [CreateLockApprovalStatus, amount, hasActiveLocks, isBalanceInsufficient]);

  const shouldButtonBeDisabled =
    !isValid ||
    isBalanceInsufficient ||
    CreateLockTxStatus === CREATE_LOCK_TX_STATUS.CONFIRMING_APPROVE_TX ||
    CreateLockTxStatus === CREATE_LOCK_TX_STATUS.AWAITING_SIGNATURE ||
    hasActiveLocks;

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
        // Decide on an approach to disable locking if user already has an active lock.
        /* 
        This is quick workaround to disable locking. 
        We don't support multiple locks, however this component allows this. 
        We'll need to refactor this component to be disabled if users already have an active lock. 
        */
        if (hasActiveLocks) {
          e.preventDefault();
          return;
        }
        handleSubmit(() => {
          createLock();
        })(e);
      }}
    >
      {content}
    </Button>
  );
};
