import { addWeeks, nextWednesday } from "date-fns";
import { useCallback, useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useAccount } from "wagmi";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import useLock from "@/lib/contracts/locking/useLock";
import useModal from "@/lib/providers/modal.provider";
import { Button, DropdownButton } from "@/components/_shared";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import styles from "./locks-list.module.scss";

interface ILocksList {
  account: Address;
}

export const LocksList = ({ account }: ILocksList) => {
  const { address } = useAccount();
  const { locks, refetch } = useLocksByAccount({ account });

  return (
    <div className={`${styles.locksList} overflow-auto`}>
      <div className="mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2">
        <div className="min-w-[150px] text-base font-medium not-italic">
          Amount MENTO
        </div>
        <div className="min-w-[150px] text-base font-medium not-italic">
          Amount veMENTO
        </div>
        <div className="min-w-[150px] text-base font-medium not-italic">
          Expires on
        </div>
      </div>
      {address &&
        locks.map((lock) => (
          <LockEntry
            account={address}
            onExtend={refetch}
            lock={lock}
            key={lock.lockId}
          />
        ))}
    </div>
  );
};

const LockEntry = ({
  lock,
  onExtend,
}: {
  lock: Lock;
  account: Address;
  onExtend: () => void;
}) => {
  const { address } = useAccount();
  const { showConfirm } = useModal();

  const { relockMento } = useRelockMento();

  const { lockData } = useLock({
    lock,
  });

  const mentoParsed = useMemo(() => {
    return Number(formatUnits(lock.amount || 0n, 18)).toLocaleString();
  }, [lock.amount]);

  const veMentoParsed = useMemo(() => {
    return Number(formatUnits(lockData?.[0] || 0n, 18)).toLocaleString();
  }, [lockData]);

  const expirationDate = useMemo(() => {
    if (lock.lockCreate.length === 0) return "Expiration date not set";
    const startDate = new Date(lock.lockCreate[0]?.timestamp * 1000);
    const endDate = nextWednesday(addWeeks(startDate, lock.slope + lock.cliff));
    return endDate.toLocaleDateString();
  }, [lock]);

  const reLock = useCallback(async () => {
    const res = await showConfirm(
      `Are you sure you want to extend lock ${lock.lockId}?`,
    );

    if (!res) return;

    relockMento(
      lock.lockId,
      address!,
      lock.amount,
      lock.slope,
      lock.cliff,
      onExtend,
    );
  }, [
    showConfirm,
    lock.lockId,
    lock.amount,
    lock.slope,
    lock.cliff,
    relockMento,
    address,
    onExtend,
  ]);

  return (
    <div className="mb-x2 grid grid-cols-3 items-center gap-[18px] px-x1 py-x2">
      <div className="grid-span-[1 / -1] border-b border-solid border-gray"></div>
      <div className="min-w-[150px] font-medium not-italic">{mentoParsed}</div>
      <div className="min-w-[150px] font-medium not-italic">
        {veMentoParsed}
      </div>
      <div className="min-w-[150px] font-medium not-italic">
        {expirationDate}
      </div>
      <div>
        <DropdownButton className="md:hidden" theme="clear">
          <DropdownButton.Dropdown>
            <DropdownButton.Element onClick={reLock}>
              Extend lock
            </DropdownButton.Element>
          </DropdownButton.Dropdown>
        </DropdownButton>
        <Button className="md:static" fullwidth theme="clear" onClick={reLock}>
          Extend lock
        </Button>
      </div>
    </div>
  );
};
