import { addWeeks, format, isAfter, nextWednesday } from "date-fns";
import { Fragment, useMemo } from "react";
import { Address, formatUnits } from "viem";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import useTokens from "@/lib/contracts/useTokens";
import { cn } from "@/styles/helpers";
import { WithdrawButton } from "../withdraw/withdraw-button";
import { useAvailableToWithdraw } from "@/lib/contracts/locking/useAvailableToWithdraw";

interface ILocksList {
  account: Address;
  locks: Lock[];
  onExtend: () => void;
}

export const LocksList = ({ locks, onExtend, account }: ILocksList) => {
  const sortedLocks: Lock[] = useMemo(() => {
    if (!account || locks.length === 0) return [];

    if (locks.length === 1) return locks;

    return locks.toSorted((lockA, lockB) => {
      if (lockA.lockCreate.length === 0 || lockB.lockCreate.length === 0)
        return 0;

      const aExpiration = getLockExpirationDate(
        lockA.lockCreate[0].timestamp,
        lockA.slope,
        lockA.cliff,
      );
      const bExpiration = getLockExpirationDate(
        lockB.lockCreate[0].timestamp,
        lockB.slope,
        lockB.cliff,
      );
      const compareResult = isAfter(aExpiration, bExpiration) ? 1 : -1;
      return compareResult;
    });
  }, [account, locks]);

  const { availableToWithdraw } = useAvailableToWithdraw();
  const hasAmountToWithdraw = availableToWithdraw > BigInt(0);

  return (
    <div className={`overflow-auto`}>
      <div
        className={cn(
          "mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 ",
          hasAmountToWithdraw && "md:grid-cols-5",
        )}
      >
        <LockTableTitle>MENTO</LockTableTitle>
        <LockTableTitle>veMENTO</LockTableTitle>
        <LockTableTitle>Expires on</LockTableTitle>
        {hasAmountToWithdraw && <LockTableTitle> </LockTableTitle>}
      </div>
      {sortedLocks.map((lock, index, array) => (
        <Fragment key={`lock-entry-${index}`}>
          <LockEntry
            account={account}
            onExtend={onExtend}
            lock={lock}
            availableToWithdraw={availableToWithdraw}
          />
          {index !== array.length - 1 ?? (
            <div className="grid-span-[1/-1] border-b border-solid border-gray-light" />
          )}
        </Fragment>
      ))}
    </div>
  );
};

const LockTableTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="col-span-1 min-w-[150px] font-inter text-base/[24px]
      font-medium not-italic text-gray-dark"
    >
      {children}
    </div>
  );
};

const LockTableValue = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-w-[150px] text-[18px]/none font-medium not-italic md:text-[22px]/none">
      {children}
    </div>
  );
};

const LockEntry = ({
  lock,
  availableToWithdraw,
}: {
  lock: Lock;
  account: Address;
  onExtend: () => void;
  availableToWithdraw: bigint;
}) => {
  const {
    mentoContractData: { decimals: mentoDecimals },
  } = useTokens();

  const { data } = useLockCalculation({
    lock: {
      amount: formatUnits(lock.amount, mentoDecimals),
      slope: lock.slope,
      cliff: lock.cliff,
    },
  });

  const mentoParsed = useMemo(() => {
    return Number(formatUnits(lock.amount, mentoDecimals)).toFixed(3);
  }, [lock.amount, mentoDecimals]);

  const expirationDate = useMemo(() => {
    if (lock.lockCreate.length === 0) return "Expiration Date not available";
    const expiration = getLockExpirationDate(
      lock.lockCreate[0]?.timestamp,
      lock.slope,
      lock.cliff,
    );
    return format(expiration, "dd/MM/yyyy");
  }, [lock]);

  const hasAmountToWithdraw = availableToWithdraw > BigInt(0);

  return (
    <div
      className={cn(
        "mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2",
        hasAmountToWithdraw && "md:grid-cols-5",
      )}
    >
      <LockTableValue>{mentoParsed}</LockTableValue>
      <LockTableValue>{data?.veMentoReceived}</LockTableValue>
      <LockTableValue>{expirationDate}</LockTableValue>
      <WithdrawButton />
    </div>
  );
};

function getLockExpirationDate(
  startDateTimeStamp: number,
  slope: number,
  cliff: number,
) {
  const startDate = new Date(startDateTimeStamp * 1000);
  return nextWednesday(addWeeks(startDate, slope + cliff));
}
