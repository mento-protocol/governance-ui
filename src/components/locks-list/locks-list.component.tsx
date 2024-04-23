import { addWeeks, nextWednesday } from "date-fns";
import { useMemo } from "react";
import { Address, formatUnits } from "viem";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useLockCalculation from "@/lib/contracts/locking/useLockCalculation";
import NumbersService from "@/lib/helpers/numbers.service";

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
        locks.map((lock, index, array) => (
          <>
            <LockEntry
              account={account}
              onExtend={onExtend}
              lock={lock}
              key={lock.lockId}
            />
            {index === array.length - 1 ? null : (
              <div className="grid-span-[1/-1] border-b border-solid border-gray-light" />
            )}
          </>
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
  const { data } = useLockCalculation({
    lock,
  });

  const mentoParsed = useMemo(() => {
    return NumbersService.parseNumericValue(
      Number(formatUnits(lock.amount || 0n, 18)),
    );
  }, [lock.amount]);

  const veMentoParsed = useMemo(() => {
    return NumbersService.parseNumericValue(
      Number(formatUnits(data?.[0] || 0n, 18)).toLocaleString(),
    );
  }, [data]);

  const expirationDate = useMemo(() => {
    if (lock.lockCreate.length === 0) return "Expiration date not set";
    const startDate = new Date(lock.lockCreate[0]?.timestamp * 1000);
    const endDate = nextWednesday(addWeeks(startDate, lock.slope + lock.cliff));
    return endDate.toLocaleDateString();
  }, [lock]);

  return (
    <div className="mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2">
      <LockTableValue>{mentoParsed}</LockTableValue>
      <LockTableValue>{veMentoParsed}</LockTableValue>
      <LockTableValue>{expirationDate}</LockTableValue>
    </div>
  );
};
