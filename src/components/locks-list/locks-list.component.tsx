import {
  addWeeks,
  addYears,
  differenceInWeeks,
  format,
  isDate,
  nextWednesday,
} from "date-fns";
import React, { useMemo } from "react";
import { formatUnits } from "viem";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useTokens from "@/lib/contracts/useTokens";
import { Card, DatePicker, Loader } from "../_shared";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import LockingHelper from "@/lib/helpers/locking";
import { Button, variants } from "../_shared/button/button.component";
import { cn } from "@/styles/helpers";
import { useUnlockedMento } from "@/lib/contracts/locking/useUnlockedMento";
import { Popover } from "@headlessui/react";
import { useAccount } from "wagmi";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import { WithdrawButton } from "../withdraw/withdraw-button";
import useLockedAmount from "@/lib/contracts/locking/useLockedAmount";
import useLockExpirationDate from "@/lib/contracts/locking/useLockExpirationDate";

export const LocksList = () => {
  const { address } = useAccount();
  const { locks } = useLocksByAccount({ account: address! });
  const { data: unlockedMento } = useUnlockedMento();
  const { mentoContractData, veMentoContractData } = useTokens();
  const { data: lockedBalance } = useLockedAmount();

  const parsedLockedBalance = Number(
    formatUnits(lockedBalance ?? BigInt(0), veMentoContractData.decimals),
  ).toFixed(2);

  const lock = React.useMemo(
    () => locks.toSorted((a, b) => b.lockId - a.lockId)[0],
    [locks],
  );

  useLogOnce({ lock, locks });

  const { data: expirationDate } = useLockExpirationDate(
    lock.slope,
    lock.cliff,
    lock.time,
  );

  if (!address) {
    return (
      <Card block>
        <div className="text-center">
          Your lock will appear here. Connect your wallet to view it.
        </div>
      </Card>
    );
  }

  if (locks.length === 0) {
    return (
      <Card block>
        <div className="text-center">You have no existing locks</div>
      </Card>
    );
  }

  const parsedUnlockedMento = Number(
    formatUnits(unlockedMento ?? BigInt(0), mentoContractData.decimals),
  ).toFixed(2);

  const parsedExpirationDate = format(
    expirationDate ?? new Date(),
    "dd/MM/yyyy",
  );

  const lockWithMoreInfo = { ...lock, expirationDate };

  return (
    <Card className="grid grid-cols-3 gap-4 md:grid-cols-5">
      <LockTableTitle>MENTO</LockTableTitle>
      <LockTableTitle>veMENTO</LockTableTitle>
      <LockTableTitle>Expires On</LockTableTitle>
      <div className="hidden md:block" />
      <div className="hidden md:block" />
      <LockTableValue>{parsedUnlockedMento}</LockTableValue>
      <LockTableValue>{parsedLockedBalance}</LockTableValue>
      <LockTableValue>{parsedExpirationDate}</LockTableValue>
      <div>
        <WithdrawButton />
      </div>
      <div className="md:hidden" />
      <RelockForm lock={lockWithMoreInfo} />
    </Card>
  );
};

const RelockForm = ({
  lock,
}: {
  lock: Lock & { expirationDate: Date | undefined };
}) => {
  const { veMentoBalance } = useTokens();

  const [expirationDate, setExpirationDate] = React.useState<Date>(
    nextWednesday(new Date()),
  );

  const numOfWeeksToExtendLock = React.useMemo(() => {
    if (!expirationDate) return 0;
    return differenceInWeeks(expirationDate, new Date(), {
      roundingMethod: "floor",
    });
  }, [expirationDate]);

  const handleDateSelection = (date: Date) => {
    setExpirationDate(date);
  };

  const { relockMento, isAwaitingUserSignature } = useRelockMento({
    id: BigInt(lock.lockId),
    newDelegate: lock.owner.id,
    newAmount: veMentoBalance.value,
    newSlope: numOfWeeksToExtendLock,
    newCliff: lock.cliff,
    onSuccess: () => {},
    onError: (error) => {
      console.log({ error });
    },
  });

  if (!isDate(expirationDate)) {
    return <span className="text-mento-blue underline">Extend Lock</span>;
  }

  if (isAwaitingUserSignature) {
    return <LoadingPopover />;
  }

  return (
    <RelockingDatePicker
      onDateSelection={handleDateSelection}
      selectedDate={expirationDate}
    />
  );
};

const RelockingDatePicker = ({
  selectedDate,
  onDateSelection,
}: {
  selectedDate: Date;
  onDateSelection: (date: Date) => void;
}) => {
  const listOfDaysAfterTodayExceptWednesdays = [
    {
      // Minimum lock duration is 1 week, and only on Wednesdays. Disable days before next Wednesday after a week
      before: nextWednesday(addWeeks(new Date(), 1)),
    },
    ...LockingHelper.getDaysExceptWednesday(),
  ];

  return (
    <DatePicker
      defaultMonth={new Date()}
      fromMonth={new Date()}
      toMonth={LockingHelper.addYearsAndAdjustToNextWednesday(2)}
      fixedWeeks={true}
      disabled={listOfDaysAfterTodayExceptWednesdays}
      selected={selectedDate}
      onDayClick={onDateSelection}
    >
      <DatePicker.Button
        className={cn(
          variants({ theme: "clear" }),
          "hidden h-full w-fit items-center justify-items-center md:flex",
        )}
      >
        Extend lock
      </DatePicker.Button>
    </DatePicker>
  );
};

const LoadingPopover = () => {
  return (
    <Popover className="relative">
      {({ close }) => (
        <>
          <Popover.Button
            className={cn(
              "w-full rounded-[4px] border border-gray-light p-1 text-left",
            )}
          >
            <Button disabled theme={"clear"}>
              Extend Lock
            </Button>
          </Popover.Button>
          <Popover.Panel
            static
            className="absolute z-10 rounded-[4px] border border-gray-light bg-white dark:bg-black-off"
          >
            <Loader />
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

const LockTableTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="col-span-1 font-inter text-base/[24px]
      font-medium not-italic text-gray-dark"
    >
      {children}
    </div>
  );
};

const LockTableValue = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-1 flex items-center justify-center text-[18px]/none font-medium not-italic md:text-[22px]/none">
      {children}
    </div>
  );
};

const useLogOnce = (message: any) => {
  const hasLogged = React.useRef(false);

  React.useEffect(() => {
    if (!hasLogged.current) {
      console.log(message);
      hasLogged.current = true;
    }
  }, [message]);
};
