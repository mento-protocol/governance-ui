import { LockingABI } from "@/lib/abi/Locking";
import { useContracts } from "@/lib/contracts/useContracts";
import { useSuspenseQuery } from "@apollo/client";
import classNames from "classnames";
import { addWeeks, nextWednesday } from "date-fns";
import { useCallback, useMemo } from "react";
import { formatUnits } from "viem";
import { useAccount, useChainId, useReadContract } from "wagmi";
import styles from "./locks-list.module.scss";
import useRelockMento from "@/lib/contracts/locking/useRelockMento";
import useModal from "@/lib/providers/modal.provider";
import { Button, DropdownButton } from "@/components/_shared";

export const LocksList = () => {
  const chainId = useChainId();
  const { address } = useAccount();
  const { data, refetch } = useSuspenseQuery<{ locks: Lock[] }>(
    GetLocksDocument,
    {
      variables: { address },
      context: {
        apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
      },
    },
  );

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
      {data?.locks?.map((lock) => (
        <LockEntry onExtend={refetch} lock={lock} key={lock.lockId} />
      ))}
    </div>
  );
};

const LockEntry = ({
  lock,
  key,
  onExtend,
}: {
  lock: Lock;
  key: string | number;
  onExtend: () => void;
}) => {
  const contracts = useContracts();
  const { address } = useAccount();
  const { showConfirm } = useModal();

  const { relockMento } = useRelockMento();

  const { data: getLock } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [lock.amount, lock.slope, lock.cliff],
  });

  const mentoParsed = useMemo(() => {
    return Number(formatUnits(lock.amount || 0n, 18)).toLocaleString();
  }, [lock.amount]);

  const veMentoParsed = useMemo(() => {
    return Number(formatUnits(getLock?.[0] || 0n, 18)).toLocaleString();
  }, [getLock]);

  const expirationDate = useMemo(() => {
    const startDate = new Date(lock.lockCreate[0].timestamp * 1000);
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
    <div className={styles.locksList__row} key={key}>
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
