import React, { useState } from "react";
import { addWeeks, nextWednesday } from "date-fns";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";

import { cn } from "@/styles/helpers";
import {
  Button,
  DatePicker,
  Sheet,
  SheetTrigger,
  SheetDescription,
  SheetContent,
} from "@/components/_shared";
import { Calendar } from "@/components/_shared/calendar/calendar.component";
import { variants } from "@/components/_shared/button/button.component";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
import { MangeLockFormProvider } from "../manage-lock-form-provider";
import LockingHelper from "@/lib/helpers/locking";
import { useFormContext } from "react-hook-form";
import { useManageLock } from "../manage-lock.provider";
import useLockingWeek from "@/lib/contracts/locking/useLockingWeek";
import { LockingInput } from "@/components/_shared/mento-lock/components";
import { LOCKING_DURATION_FORM_KEY } from "@/lib/constants/locking";
import { Switch } from "@headlessui/react";

export interface ManageLockButtonProps {
  lock: ExtendedLock;
}

export const ManageLockButton = ({
  lock,
}: {
  lock: Lock & { expiration: Date };
}) => {
  return (
    <MangeLockFormProvider lock={lock} className="h-full">
      <MobileRelockForm />
      <DesktopRelockForm />
    </MangeLockFormProvider>
  );
};

const MobileRelockForm = () => {
  const {
    watch,
    setValue,
    reset,
    formState: { isValid },
  } = useFormContext();
  const selectedDate = watch(LOCKING_DURATION_FORM_KEY);
  const { lockToManage } = useManageLock();
  const { currentWeek } = useLockingWeek();

  const maxExtensionWeeks = LockingHelper.calculateMaxExtensionWeeks(
    Number(currentWeek),
    lockToManage.time,
    lockToManage.slope,
  );

  const disabledDays = [
    { before: nextWednesday(lockToManage.expiration) },
    ...LockingHelper.getDaysExceptWednesday(),
  ];

  const onDateSelection = (date: Date) => {
    setValue(LOCKING_DURATION_FORM_KEY, date);
  };

  const [shouldUpdateLockingAmount, setShouldUpdateLockingAmount] =
    useState(false);

  return (
    <Sheet>
      <SheetTrigger
        onAbort={reset}
        className="border-none p-0 text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white md:hidden"
      >
        Extend Lock
      </SheetTrigger>
      <SheetContent
        className="flex items-center justify-center bg-white dark:bg-black-off"
        side="bottom"
      >
        <SheetDescription className="flex w-full flex-col items-center justify-center gap-4 px-4">
          <Calendar
            defaultMonth={lockToManage?.expiration}
            fromMonth={lockToManage?.expiration}
            toMonth={addWeeks(lockToManage.expiration, maxExtensionWeeks)}
            fixedWeeks={true}
            disabled={disabledDays}
            selected={selectedDate}
            onDayClick={onDateSelection}
          />
          <div className="flex w-full items-center justify-between gap-2">
            <label>Add additional MENTO</label>
            <Switch
              checked={shouldUpdateLockingAmount}
              onChange={() => setShouldUpdateLockingAmount((last) => !last)}
              className={`${
                shouldUpdateLockingAmount ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full border border-black transition-colors`}
            >
              <span
                className={`${
                  shouldUpdateLockingAmount ? "translate-x-6" : "translate-x-1"
                } inline-block size-4 transform rounded-full bg-black transition-transform`}
              />
            </Switch>
          </div>
          {shouldUpdateLockingAmount && <LockingInput />}
          <Button disabled={!isValid} fullwidth theme="primary" type="submit">
            Confirm
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

const DesktopRelockForm = () => {
  const {
    watch,
    setValue,
    formState: { isValid },
    reset,
  } = useFormContext();
  const selectedDate = watch(LOCKING_DURATION_FORM_KEY);
  const { lockToManage } = useManageLock();
  const { currentWeek } = useLockingWeek();

  const maxExtensionWeeks = LockingHelper.calculateMaxExtensionWeeks(
    Number(currentWeek),
    lockToManage.time,
    lockToManage.slope,
  );

  const disabledDays = [
    { before: nextWednesday(lockToManage.expiration) },
    ...LockingHelper.getDaysExceptWednesday(),
  ];

  const onDateSelection = (date: Date) => {
    setValue(LOCKING_DURATION_FORM_KEY, date);
  };

  const [shouldUpdateLockingAmount, setShouldUpdateLockingAmount] =
    useState(false);

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
        className={cn(
          variants({ theme: "clear" }),
          "h-[62px] w-fit items-center justify-items-center",
        )}
      >
        Mange Lock
      </DatePicker.Button>
      <DatePicker.Panel className="items-center">
        <div className="flex w-[250px] flex-col items-center justify-center gap-4 px-2 pb-4">
          <div className="flex w-full items-center justify-between gap-2">
            <label>Add additional MENTO</label>
            <Switch
              checked={shouldUpdateLockingAmount}
              onChange={() => setShouldUpdateLockingAmount((last) => !last)}
              className={`${
                shouldUpdateLockingAmount ? "bg-blue-600" : "bg-gray-200"
              } relative inline-flex h-6 w-11 items-center rounded-full border border-black transition-colors`}
            >
              <span
                className={`${
                  shouldUpdateLockingAmount ? "translate-x-6" : "translate-x-1"
                } inline-block size-4 transform rounded-full bg-black transition-transform`}
              />
            </Switch>
          </div>
          {shouldUpdateLockingAmount && <LockingInput />}
          <Button disabled={!isValid} fullwidth theme={"primary"} type="submit">
            Confirm
          </Button>
        </div>
      </DatePicker.Panel>
    </DatePicker>
  );
};
