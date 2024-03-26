import styles from "./locks-list.module.scss";
import classNames from "classnames";
import { useSuspenseQuery } from "@apollo/client";
import { useChainId, useReadContract } from "wagmi";
import React, { useCallback, useMemo, useState, useTransition } from "react";
import { addWeeks, addYears, nextWednesday, setDay } from "date-fns";
import { formatUnits } from "viem";
import { toast } from "sonner";
import { Lock } from "@/lib/graphql";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { GetMyLocksDocument } from "@/lib/graphql";
import { useContracts } from "@/lib/contracts/useContracts";
import useModal from "@/lib/providers/modal.provider";
import { ExtendLockModal } from "@/components/extend-lock-modal/extend-lock.modal";
import { Button, Loader } from "@/components/_shared";
import { LockingABI } from "@/lib/abi/Locking";

interface LocksListProps extends BaseComponentProps {
  address: string;
}

export const LocksList = ({ address }: LocksListProps) => {
  const chainId = useChainId();
  const [isPending, startTransition] = useTransition();
  const [isRefetchPending, setIsRefetchPending] = useState(false);
  const { data, refetch } = useSuspenseQuery<{ locks: Lock[] }>(
    GetMyLocksDocument,
    {
      variables: { address },
      context: {
        apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
      },
      refetchWritePolicy: "overwrite",
    },
  );

  const reload = useCallback(
    (lockId: string) => {
      setIsRefetchPending(true);
      let intervalCounter = 0;
      startTransition(async () => {
        const interval = setInterval(() => {
          refetch().then((data) => {
            if (
              data?.data?.locks?.some(
                (lock) => lock.replaces?.lockId === lockId,
              )
            ) {
              clearInterval(interval);
              setIsRefetchPending(false);
            } else {
              if (intervalCounter > 20) {
                clearInterval(interval);
                setIsRefetchPending(false);
                toast.error("Unable to refetch data, please refresh the page.");
              }
              intervalCounter++;
            }
          });
        }, 500);
      });
    },
    [refetch],
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
      {!isPending &&
        !isRefetchPending &&
        data?.locks?.map((lock) => (
          <div key={lock.lockId}>
            <LockEntry onExtend={reload} lock={lock} />
          </div>
        ))}
      {(isPending || isRefetchPending) && (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

const LockEntry = ({
  lock,
  onExtend,
}: {
  lock: Lock;
  onExtend: (lockId: string) => void;
}) => {
  const contracts = useContracts();
  const { showModal } = useModal();

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
    const createTimestamp =
      lock.lockCreate[0]?.timestamp || lock.replaces?.relock[0]?.timestamp;
    if (!createTimestamp) return undefined;
    const startDate = new Date(createTimestamp * 1000);
    return nextWednesday(addWeeks(startDate, lock.slope + lock.cliff));
  }, [lock]);

  const canRelock = useMemo(() => {
    if (!expirationDate) return false;
    const minDate = addWeeks(expirationDate!, 1);
    const maxDate = setDay(addYears(new Date(), 2), 3);

    return minDate < maxDate;
  }, [expirationDate]);

  const reLock = async () => {
    if (!expirationDate) return;
    const minDate = addWeeks(expirationDate!, 1);
    const maxDate = setDay(addYears(new Date(), 2), 3);

    console.log(minDate.toDateString(), maxDate.toDateString());

    await showModal(
      <ExtendLockModal
        minDate={minDate}
        maxDate={maxDate}
        lock={lock}
        onSuccess={() => onExtend(lock.lockId)}
      />,
      {
        hideTitle: true,
      },
    );
  };

  return (
    <div className={styles.locksList__row}>
      <div className={styles.divider}></div>
      <div className={styles.item}>{mentoParsed}</div>
      <div className={styles.item}>{veMentoParsed}</div>
      <div className={styles.item}>
        <div>{expirationDate?.toLocaleDateString()}</div>
        <div className="md:hidden">
          {!!expirationDate && (
            <button
              className="p-0 bg-transparent text-primary transition-all whitespace-nowrap underline hover:text-secondary md:hidden"
              onClick={reLock}
            >
              Extend lock
            </button>
          )}
        </div>
      </div>
      <div className={classNames(styles.item, "hidden md:block")}>
        {canRelock && (
          <Button className="md:static" block theme="clear" onClick={reLock}>
            Extend lock
          </Button>
        )}
      </div>
    </div>
  );
};
