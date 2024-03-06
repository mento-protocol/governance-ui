import styles from "./locks-list.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button, DropdownButton } from "@components/_shared";
import classNames from "classnames";
import { GetLocksDocument, Lock } from "@/app/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { useAccount, useReadContract } from "wagmi";
import { LockingABI } from "@/app/abis/Locking";
import { useContracts } from "@/app/hooks/useContracts";
import { useCallback, useMemo } from "react";
import { addWeeks, format, nextWednesday } from "date-fns";
import { formatUnits } from "viem";
import { useWriteContract } from "wagmi";
import useModal from "@/app/providers/modal.provider";

interface LocksListProps extends BaseComponentProps {
  address: string;
}

export const LocksList = ({ address }: LocksListProps) => {
  const { data, refetch } = useSuspenseQuery<{ locks: Lock[] }>(
    GetLocksDocument,
    {
      variables: { address },
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
  const { showConfirm } = useModal();
  const { address } = useAccount();
  const { error, writeContract } = useWriteContract();

  const { data: getLock } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [lock.amount, lock.slope, lock.cliff],
  });

  const mentoParsed = useMemo(() => {
    return Number(formatUnits(lock.amount || 0n, 18)).toLocaleString();
  }, [lock.amount]);

  const vementoParsed = useMemo(() => {
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

    writeContract(
      {
        address: contracts.Locking.address,
        abi: LockingABI,
        functionName: "relock",
        args: [lock.lockId, address!, lock.amount, lock.slope, lock.cliff],
      },
      {
        onSuccess: () => {
          onExtend();
        },
      },
    );
  }, [
    writeContract,
    contracts.Locking.address,
    lock.lockId,
    lock.amount,
    lock.slope,
    lock.cliff,
    address,
  ]);

  return (
    <div className={styles.locksList__row} key={key}>
      <div className={styles.divider}></div>
      <div className={styles.item}>{mentoParsed}</div>
      <div className={styles.item}>{vementoParsed}</div>
      <div className={styles.item}>{expirationDate}</div>
      {/*<div>*/}
      {/*  <DropdownButton className="md:hidden" theme="clear">*/}
      {/*    <DropdownButton.Dropdown>*/}
      {/*      <DropdownButton.Element onClick={reLock}>*/}
      {/*        Extend lock*/}
      {/*      </DropdownButton.Element>*/}
      {/*    </DropdownButton.Dropdown>*/}
      {/*  </DropdownButton>*/}
      {/*  <Button className="md:static" block theme="clear" onClick={reLock}>*/}
      {/*    Extend lock*/}
      {/*  </Button>*/}
      {/*</div>*/}
    </div>
  );
};
