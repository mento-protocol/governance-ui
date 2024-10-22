import React, { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
import { useManageLockForm } from "./hooks/use-manage-lock-form";
import { ManageLockProvider } from "./manage-lock.provider";

interface LockingFormProps {
  children: ReactNode;
  lock: ExtendedLock;
  className?: string;
}

export const MangeLockFormProvider = ({
  children,
  lock,
  ...restProps
}: LockingFormProps) => {
  const formMethods = useManageLockForm(lock);

  return (
    <FormProvider {...formMethods}>
      <ManageLockProvider {...restProps} lockToManage={lock}>
        {children}
      </ManageLockProvider>
    </FormProvider>
  );
};
