import {
  addWeeks,
  addYears,
  differenceInWeeks,
  format,
  nextWednesday,
} from "date-fns";
import React, { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import useTokens from "@/lib/contracts/useTokens";
import { Card, DatePicker, Loader } from "../_shared";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import LockingHelper from "@/lib/helpers/locking";
import { Button, variants } from "../_shared/button/button.component";
import { cn } from "@/styles/helpers";
import { useUnlockedMento } from "@/lib/contracts/locking/useUnlockedMento";
import { Popover } from "@headlessui/react";

interface ILocksList {
  account: Address;
  locks: Lock[];
  onExtend: () => void;
}

export const LocksList = ({ locks, onExtend, account }: ILocksList) => {
  if (!account) {
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

  return (
    <Card block>
      <div className="mb-x2 grid grid-cols-3 md:grid-cols-4 md:gap-[18px] md:px-x1">
        <LockTableTitle>MENTO</LockTableTitle>
        <LockTableTitle>veMENTO</LockTableTitle>
        <LockTableTitle>Expires on</LockTableTitle>
      </div>
      <LockEntry account={account} onExtend={onExtend} lock={locks[0]} />
    </Card>
  );
};

const LockEntry = ({
  lock,
}: {
  lock: Lock;
  account: Address;
  onExtend: () => void;
}) => {
  const { data: unlockedMento } = useUnlockedMento();
  const { veMentoContractData } = useTokens();

  const { data } = useLockCalculation({
    lock: {
      amount: formatUnits(lock.amount, veMentoContractData.decimals),
      slope: lock.slope,
      cliff: lock.cliff,
    },
  });

  const expirationDate = useMemo(() => {
    if (lock.lockCreate.length === 0) return "Expiration Date not available";
    const expiration = LockingHelper.getLockExpirationDate(
      lock.lockCreate[0]?.timestamp,
      lock.slope,
      lock.cliff,
    );
    return format(expiration, "dd/MM/yyyy");
  }, [lock]);

  const parsedUnlockedMento = Number(
    formatUnits(unlockedMento ?? BigInt(0), veMentoContractData.decimals),
  ).toFixed(2);

  return (
    <div className="flex flex-col">
      <div className="mb-x2 grid grid-cols-3 py-x2 md:grid-cols-4 md:gap-[18px] md:px-x1">
        <LockTableValue>{parsedUnlockedMento}</LockTableValue>
        <LockTableValue>{data?.veMentoReceived}</LockTableValue>
        <LockTableValue>{expirationDate}</LockTableValue>
        <div className="hidden md:block">
          <LockTableValue>
            <RelockForm lock={{ ...lock, expirationDate }} />
          </LockTableValue>
        </div>
      </div>
      <div className="md:hidden">
        <RelockForm lock={{ ...lock, expirationDate }} />
      </div>
    </div>
  );
};

const RelockForm = ({ lock }: { lock: Lock & { expirationDate: string } }) => {
  const {
    getDaysExceptWednesday,
    addYearsAndAdjustToNextWednesday,
    getLockExpirationDate,
  } = LockingHelper;

  const { veMentoBalance } = useTokens();

  const [newLockExpirationDate, setNewLockExpirationDate] =
    React.useState<Date | null>(null);

  const numOfWeeksToExtendLock = React.useMemo(() => {
    if (!newLockExpirationDate) return 0;
    return differenceInWeeks(newLockExpirationDate, new Date(), {
      roundingMethod: "floor",
    });
  }, [newLockExpirationDate]);

  const currentExpirationDate = getLockExpirationDate(
    lock.lockCreate[0]?.timestamp,
    lock.slope,
    lock.cliff,
  );

  const nextValidExpirationDate = nextWednesday(currentExpirationDate);

  const listOfDaysAfterExpirationExceptWednesdays = [
    {
      // Minimum lock duration is 1 week, and only on Wednesdays. Disable days before next Wednesday after a week
      before: nextWednesday(addWeeks(nextValidExpirationDate, 1)),
    },
    ...getDaysExceptWednesday(
      nextValidExpirationDate,
      addYears(nextValidExpirationDate, 2),
    ),
  ];

  const { relockMento, isAwaitingUserSignature } = useRelockMento({
    id: BigInt(lock.lockId),
    newDelegate: lock.owner.id,
    newAmount: veMentoBalance.value,
    newSlope: lock.slope,
    newCliff: numOfWeeksToExtendLock,
    onSuccess: () => {},
    onError: (error) => {
      console.log({ error });
    },
  });

  if (isAwaitingUserSignature) {
    return <LoadingPopover />;
  }

  return (
    <DatePicker
      fromMonth={currentExpirationDate}
      toMonth={addYearsAndAdjustToNextWednesday(2, currentExpirationDate)}
      fixedWeeks={true}
      disabled={listOfDaysAfterExpirationExceptWednesdays}
      onDayClick={setNewLockExpirationDate}
      selected={newLockExpirationDate ?? nextValidExpirationDate}
      closeOnSelect={false}
    >
      <DatePicker.Button
        className={cn(
          variants({ theme: "clear" }),
          "hidden w-fit md:inline-block ",
        )}
      >
        Extend lock
      </DatePicker.Button>
      <DatePicker.Button className={cn("w-fit text-mento-blue underline")}>
        Extend lock
      </DatePicker.Button>
      <DatePicker.Panel>
        <div className="flex items-center justify-center p-4">
          <Button theme={"clear"} onClick={relockMento}>
            Extend Lock
          </Button>
        </div>
      </DatePicker.Panel>
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
    <div className="col-span-1 flex items-center justify-center text-[22px]/none font-medium not-italic">
      {children}
    </div>
  );
};
