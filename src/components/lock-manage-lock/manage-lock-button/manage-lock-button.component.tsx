import React from "react";
import { addWeeks } from "date-fns";

import { cn } from "@/styles/helpers";
import {
  Button,
  DatePicker,
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/_shared";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Calendar } from "@/components/_shared/calendar/calendar.component";
import { variants } from "@/components/_shared/button/button.component";
import { MangeLockFormProvider } from "../manage-lock-form-provider";

import { useManageLock } from "../manage-lock.provider";

import { LockingInput } from "@/components/_shared/mento-lock/components";

import { ManageLockSwitch } from "../manage-lock-switch/manage-lock-switch.component";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";

export interface ManageLockButtonProps {
  lock: LockWithExpiration;
}

export const ManageLockButton = ({ lock }: ManageLockButtonProps) => {
  return (
    <MangeLockFormProvider lock={lock} className="h-full">
      <MobileRelockForm />
      <DesktopRelockForm />
    </MangeLockFormProvider>
  );
};

const MobileRelockForm = () => {
  const {
    lockToManage,
    maxExtensionWeeks,
    disabledDays,
    selectedDate,
    onDateSelection,
    shouldUpdateLockingAmount,
    setShouldUpdateLockingAmount,
  } = useManageLock();

  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <VisuallyHidden>
        <SheetTitle>Manage Lock</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger className="border-none p-0 text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white md:hidden">
        Manage Lock
      </SheetTrigger>
      <SheetContent
        className="flex items-center justify-center border-t border-black bg-white dark:bg-black-off"
        side="bottom"
      >
        <div className="flex w-full flex-col items-center justify-center gap-4 px-4">
          <Calendar
            defaultMonth={lockToManage?.expiration}
            fromMonth={lockToManage?.expiration}
            toMonth={addWeeks(lockToManage.expiration, maxExtensionWeeks)}
            fixedWeeks={true}
            disabled={disabledDays}
            selected={selectedDate}
            onDayClick={onDateSelection}
          />
          <ManageLockSwitch
            checked={shouldUpdateLockingAmount}
            onChange={setShouldUpdateLockingAmount}
          />
          {shouldUpdateLockingAmount && <LockingInput />}
          <ManageLockConfirmButton onSuccess={() => setOpen(false)} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

const DesktopRelockForm = () => {
  const {
    lockToManage,
    maxExtensionWeeks,
    disabledDays,
    selectedDate,
    onDateSelection,
    shouldUpdateLockingAmount,
    setShouldUpdateLockingAmount,
    reset,
  } = useManageLock();

  const ref = React.useRef<HTMLButtonElement>(null);

  return (
    <DatePicker
      className="hidden md:block"
      fromMonth={lockToManage?.expiration}
      toMonth={addWeeks(lockToManage.expiration, maxExtensionWeeks)}
      fixedWeeks={true}
      disabled={disabledDays}
      selected={selectedDate}
      onDayClick={onDateSelection}
      closeOnSelect={false}
      onClose={reset}
    >
      <DatePicker.Button
        closeButtonRef={ref}
        className={cn(
          variants({ theme: "clear" }),
          "h-full w-fit items-center justify-items-center font-medium",
        )}
      >
        Manage Lock
      </DatePicker.Button>
      <DatePicker.Panel className="items-center">
        <div className="flex w-[250px] flex-col items-center justify-center gap-2 px-2 pb-4">
          <ManageLockSwitch
            checked={shouldUpdateLockingAmount}
            onChange={setShouldUpdateLockingAmount}
          />
          {shouldUpdateLockingAmount && <LockingInput />}
          <ManageLockConfirmButton onSuccess={() => ref.current?.click()} />
        </div>
      </DatePicker.Panel>
    </DatePicker>
  );
};

const ManageLockConfirmButton = ({ onSuccess }: { onSuccess?: () => void }) => {
  const { isValid, submit, isAwaitingUserSignature, isSubmitting } =
    useManageLock();

  return (
    <Button
      disabled={!isValid || isSubmitting}
      fullwidth
      theme="primary"
      onClick={
        isSubmitting
          ? () => ({})
          : () => {
              submit({ onSuccess });
            }
      }
    >
      {isAwaitingUserSignature ? "Continue in wallet" : "Confirm"}
    </Button>
  );
};
