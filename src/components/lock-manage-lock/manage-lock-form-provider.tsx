import React, { ReactNode } from "react";
import { FormProvider } from "react-hook-form";
import { useManageLockForm } from "./hooks/useMangeLockForm";
import { ManageLockProvider } from "./manage-lock.provider";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";

interface LockingFormProps {
  children: ReactNode;
  lock: LockWithExpiration;
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
