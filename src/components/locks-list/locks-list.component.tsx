import { addWeeks, format, isAfter, nextWednesday } from "date-fns";
import React, { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import useTokens from "@/lib/contracts/useTokens";

interface ILocksList {
  account: Address;
  locks: Lock[];
  onExtend: () => void;
}

export const LocksList = ({ locks, onExtend, account }: ILocksList) => {
  return (
    <div className={`overflow-auto`}>
      <div className="mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2">
        <LockTableTitle>Amount MENTO</LockTableTitle>
        <LockTableTitle>Amount veMENTO</LockTableTitle>
        <LockTableTitle>Expires on</LockTableTitle>
      </div>
      {account &&
        [...locks]
          .sort((lockA, lockB) => {
            if (lockA.lockCreate.length === 0 || lockB.lockCreate.length === 0)
              return 1;

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

            return isAfter(aExpiration, bExpiration) ? 1 : -1;
          })
          .map((lock, index, array) => (
            <React.Fragment key={lock.lockId}>
              <LockEntry
                account={account}
                onExtend={onExtend}
                lock={lock}
                key={lock.lockId}
              />
              {index === array.length - 1 ? null : (
                <div className="grid-span-[1/-1] border-b border-solid border-gray-light" />
              )}
            </React.Fragment>
          ))}
    </div>
  );
};

const LockTableTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-1 min-w-[150px] text-base font-medium not-italic">
      {children}
    </div>
  );
};

const LockTableValue = ({ children }: { children: React.ReactNode }) => {
  return <div className="min-w-[150px] font-medium not-italic">{children}</div>;
};

const LockEntry = ({
  lock,
  onExtend,
}: {
  lock: Lock;
  account: Address;
  onExtend: () => void;
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

  return (
    <div className="mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2">
      <LockTableValue>{mentoParsed}</LockTableValue>
      <LockTableValue>{data?.veMentoReceived}</LockTableValue>
      <LockTableValue>{expirationDate}</LockTableValue>
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
