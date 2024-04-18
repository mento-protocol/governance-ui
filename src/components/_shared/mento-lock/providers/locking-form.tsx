import React, { ReactNode } from "react";
import { useLockingForm } from "../hooks/useLockingForm";
import { FormProvider } from "react-hook-form";

interface LockingFormProps {
  children: ReactNode;
}

export const LockingForm = ({ children }: LockingFormProps) => {
  const methods = useLockingForm();
  return (
    <FormProvider {...methods}>
      <form>{children}</form>
    </FormProvider>
  );
};
