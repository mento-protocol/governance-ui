import classNames from "classnames";
import { addWeeks, nextWednesday } from "date-fns";
import { useCallback, useMemo } from "react";
import { Address, formatUnits } from "viem";
import { useAccount } from "wagmi";
import styles from "./locks-list.module.scss";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import useModal from "@/lib/providers/modal.provider";
import { Button, DropdownButton } from "@/components/_shared";
import useGetLocksByAccount from "@/lib/contracts/locking/useGetLocksByAccount";
import { Lock } from "@/lib/graphql/subgraph/generated/subgraph";
import useGetLock from "@/lib/contracts/locking/useGetLock";

interface ILocksList {
  account: Address;
}

export const LocksList = ({ account }: ILocksList) => {
  const { address } = useAccount();
  const { locks, refetch } = useGetLocksByAccount({ account });

  return (
    <div className={styles.locksList}>
      <div className={styles.locksList__row}>
        <div className={classNames(styles.title, styles.item)}>
          Amount MENTO
        </div>
        <div className={classNames(styles.title, styles.item)}>
          Amount veMENTO
        </div>
        <div className={classNames(styles.title, styles.item)}>Expires on</div>
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
  account,
  onExtend,
}: {
  lock: Lock;
  account: Address;
  onExtend: () => void;
}) => {
  const { address } = useAccount();
  const { showConfirm } = useModal();

  const { relockMento } = useRelockMento();

  const { lockData } = useGetLock({
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
    <div className={styles.locksList__row}>
      <div className={styles.divider}></div>
      <div className={styles.item}>{mentoParsed}</div>
      <div className={styles.item}>{veMentoParsed}</div>
      <div className={styles.item}>{expirationDate}</div>
      <div>
        <DropdownButton className="md:hidden" theme="clear">
          <DropdownButton.Dropdown>
            <DropdownButton.Element onClick={reLock}>
              Extend lock
            </DropdownButton.Element>
          </DropdownButton.Dropdown>
        </DropdownButton>
        <Button className="md:static" block theme="clear" onClick={reLock}>
          Extend lock
        </Button>
      </div>
    </div>
  );
};
