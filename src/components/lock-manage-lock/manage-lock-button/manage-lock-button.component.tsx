"use client";

import React from "react";
import { addWeeks } from "date-fns";

import { Button, buttonVariants, cn } from "@mento-protocol/ui-toolkit";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  Calendar,
  DatePicker,
} from "@/components/_shared";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { MangeLockFormProvider } from "../manage-lock-form-provider";

import { useManageLock } from "../manage-lock.provider";

import { LockingInput } from "@/components/_shared/mento-lock/components";

import { ManageLockSwitch } from "../manage-lock-switch/manage-lock-switch.component";
import { LockWithExpiration } from "@/lib/interfaces/lock.interface";
import { Tooltip } from "@/components/_shared/tooltip/tooltip.component";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { ExclamationIcon } from "@/components/_shared/icons/exclamation-icon";

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

const MobileSheetTrigger = ({
  canManageLocks,
}: {
  canManageLocks: boolean;
}) => {
  if (!canManageLocks) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <SheetTrigger
                disabled
                className="cursor-not-allowed border-none p-0 text-black underline opacity-50 dark:text-white md:hidden"
              >
                Manage Lock
              </SheetTrigger>
            </span>
          </TooltipTrigger>
          <TooltipContent
            sideOffset={10}
            className="max-w-40 rounded-md border border-gray-light bg-white p-2 font-inter text-sm dark:border-white dark:bg-mento-dark"
          >
            <div className="flex items-center gap-2">
              <div>
                <div className="flex items-center  justify-center gap-2">
                  <ExclamationIcon className="h-3 w-3 text-black" />
                  <p className="font-fg font-medium">Multiple Locks</p>
                </div>
                <p>Not support in the UI</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <SheetTrigger className="border-none p-0 text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white md:hidden">
      Manage Lock
    </SheetTrigger>
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
    canManageLocks,
  } = useManageLock();

  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen} modal={false}>
      <VisuallyHidden>
        <SheetTitle>Manage Lock</SheetTitle>
      </VisuallyHidden>
      <MobileSheetTrigger canManageLocks={canManageLocks} />
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
    canManageLocks,
  } = useManageLock();

  const ref = React.useRef<HTMLButtonElement>(null);

  const disabled = !canManageLocks;

  if (disabled) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span tabIndex={0}>
              <Button
                type="button"
                className="hidden h-full md:block"
                theme="clear"
                disabled
                onClick={(e) => e.preventDefault()}
              >
                Manage Lock
              </Button>
            </span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            align="start"
            sideOffset={10}
            className="rounded-md border border-gray-light bg-white p-3 font-inter dark:border-white dark:bg-mento-dark"
          >
            <div className="flex items-center gap-2">
              <div>
                <div className="flex items-center justify-center gap-2">
                  <ExclamationIcon className="h-4 w-4 text-black dark:text-white" />
                  <p className="font-fg font-medium">Multiple Locks</p>
                </div>
                <p>Not support in the UI</p>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

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
          buttonVariants({ theme: "clear" }),
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
