import React from "react";
import { addWeeks, nextWednesday } from "date-fns";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import LockingHelper from "@/lib/helpers/locking";
import { cn } from "@/styles/helpers";
import useRelockForm from "@/components/_shared/mento-lock/hooks/useRelockForm";
import { Button, DatePicker } from "@/components/_shared";
import { Calendar } from "@/components/_shared/calendar/calendar.component";
import { variants } from "@/components/_shared/button/button.component";
import { ExtendedLock } from "@/lib/hooks/useLockInfo";
import { TxModal } from "@/components/_shared/tx-modal/tx-modal.component";
import { toast } from "sonner";

export interface RelockFormProps {
  lock: ExtendedLock;
  expirationDate: Date;
  maxExtensionWeeks: number;
  disabledDays: Array<{ before: Date } | Date>;
  onDateSelection: (date: Date) => void;
  onSubmit?: () => void;
}

export const RelockForm = ({ lock }: { lock: Lock & { expiration: Date } }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState("");
  const [modalMessage, setModalMessage] = React.useState<React.ReactNode>(null);

  const onRelockSuccess = React.useCallback(() => {
    setIsModalOpen(false);
    toast.success("Lock Extended Successfully", {
      unstyled: true,
      duration: 2000,
    });
  }, []);

  const {
    expirationDate,
    isLockExtendible,
    maxExtensionWeeks,
    handleDateSelection,
    handleRelockSubmit,
    isPending,
    isConfirming,
    error,
  } = useRelockForm(lock, onRelockSuccess);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const retryRelock = React.useCallback(() => {
    handleRelockSubmit();
  }, [handleRelockSubmit]);

  React.useEffect(() => {
    if (isPending) {
      setModalTitle("Extending Lock");
      setModalMessage("Please confirm the transaction in your wallet.");
    } else if (isConfirming) {
      setModalTitle("Confirming Lock Extension");
      setModalMessage("Transaction is being confirmed on the blockchain.");
    } else if (error) {
      setModalTitle("Lock Extension Failed");
      setModalMessage("There was an error processing your lock extension.");
    }
  }, [isPending, isConfirming, error]);

  const onRelockSubmit = React.useCallback(() => {
    setIsModalOpen(true);
    handleRelockSubmit();
  }, [handleRelockSubmit]);

  if (!isLockExtendible) return null;

  const disabledDays = [
    { before: nextWednesday(lock.expiration) },
    ...LockingHelper.getDaysExceptWednesday(),
  ];

  return (
    <>
      <MobileRelockForm
        lock={lock}
        expirationDate={expirationDate}
        maxExtensionWeeks={maxExtensionWeeks}
        disabledDays={disabledDays}
        onDateSelection={handleDateSelection}
        onSubmit={onRelockSubmit}
      />
      <DesktopRelockForm
        lock={lock}
        expirationDate={expirationDate}
        maxExtensionWeeks={maxExtensionWeeks}
        disabledDays={disabledDays}
        onDateSelection={handleDateSelection}
        onSubmit={onRelockSubmit}
      />
      <TxModal
        isOpen={isModalOpen}
        onClose={closeModal}
        error={!!error}
        retry={retryRelock}
        title={modalTitle}
        message={modalMessage}
      />
    </>
  );
};

const MobileRelockForm = ({
  lock,
  expirationDate,
  maxExtensionWeeks,
  disabledDays,
  onDateSelection,
  onSubmit,
}: RelockFormProps) => (
  <Sheet>
    <SheetTrigger className="border-none p-0 text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white md:hidden">
      Extend Lock
    </SheetTrigger>
    <SheetContent
      className="flex items-center justify-center bg-white"
      side="bottom"
    >
      <SheetDescription className="flex flex-col items-center justify-center gap-4">
        <Calendar
          defaultMonth={lock?.expiration}
          fromMonth={lock?.expiration}
          toMonth={addWeeks(lock.expiration, maxExtensionWeeks)}
          fixedWeeks={true}
          disabled={disabledDays}
          selected={expirationDate}
          onDayClick={onDateSelection}
        />
        <Button onClick={onSubmit} theme="primary">
          Extend Lock
        </Button>
      </SheetDescription>
    </SheetContent>
  </Sheet>
);

const DesktopRelockForm = ({
  lock,
  expirationDate,
  maxExtensionWeeks,
  disabledDays,
  onDateSelection,
  onSubmit,
}: RelockFormProps) => (
  <DatePicker
    className="hidden md:block"
    // defaultMonth={lock?.expiration}
    fromMonth={lock?.expiration}
    toMonth={addWeeks(lock.expiration, maxExtensionWeeks)}
    fixedWeeks={true}
    disabled={disabledDays}
    selected={expirationDate}
    onDayClick={onDateSelection}
    closeOnSelect={false}
  >
    <DatePicker.Button
      className={cn(
        variants({ theme: "clear" }),
        "h-[62px] w-fit items-center justify-items-center",
      )}
    >
      Extend lock
    </DatePicker.Button>
    <DatePicker.Panel>
      <div className="flex items-center justify-center p-4">
        <Button theme={"primary"} onClick={onSubmit}>
          Extend Lock
        </Button>
      </div>
    </DatePicker.Panel>
  </DatePicker>
);
