"use client";
import React from "react";
import { useFormContext } from "react-hook-form";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import {
  DEFAULT_CLIFF,
  LOCKING_AMOUNT_FORM_KEY,
  LOCKING_DURATION_FORM_KEY,
} from "./constants";
import { LockingFormProvider } from "./providers/locking-form-provider";
import {
  LockingSlider,
  LockingButton,
  LockingDayPicker,
  LockingInput,
  LockingQuote,
} from "./components";

interface MentoLockProps extends BaseComponentProps {
  onLockConfirmation?: () => void;
}

export const MentoLock = ({
  className,
  onLockConfirmation,
}: MentoLockProps) => {
  return (
    <div className={className}>
      <LockingFormProvider onLockConfirmation={onLockConfirmation}>
        <div className="grid grid-cols-2 items-start gap-1 md:gap-5">
          <LockingLabel>MENTO to lock:</LockingLabel>
          <LockingInput />
          <LockingLabel>Lock until:</LockingLabel>
          <LockingDayPicker />
          <LockingLabel>You receive veMENTO:</LockingLabel>
          <LockingFormLockingQuote />
        </div>
        <LockingSlider />
        <LockingButton />
      </LockingFormProvider>
    </div>
  );
};

const LockingFormLockingQuote = () => {
  const { watch } = useFormContext();

  const amount = Number(watch(LOCKING_AMOUNT_FORM_KEY));
  const slope = watch(LOCKING_DURATION_FORM_KEY);

  return <LockingQuote amount={amount} slope={slope} cliff={DEFAULT_CLIFF} />;
};
const LockingLabel = ({ children }: { children: React.ReactNode }) => {
  return <div className="whitespace-nowrap text-[22px]">{children}</div>;
};
