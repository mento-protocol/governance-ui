import React, { ReactNode } from "react";
import { useLockingForm } from "../hooks/useLockingForm";
import { FormProvider } from "react-hook-form";
import { CreateLockProvider } from "./create-lock-provider";

interface LockingFormProps {
  children: ReactNode;
  onLockConfirmation?: () => void;
}

export const LockingFormProvider = ({
  children,
  onLockConfirmation,
}: LockingFormProps) => {
  const methods = useLockingForm();
  return (
    <FormProvider {...methods}>
      <CreateLockProvider onLockConfirmation={onLockConfirmation}>
        <form>{children}</form>
      </CreateLockProvider>
    </FormProvider>
  );
};
