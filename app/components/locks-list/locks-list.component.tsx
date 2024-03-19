import styles from "./locks-list.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button } from "@components/_shared";
import classNames from "classnames";
import { GetMyLocksDocument, Lock } from "@/app/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { useChainId, useReadContract } from "wagmi";
import { LockingABI } from "@/app/abis/Locking";
import { useContracts } from "@/app/hooks/useContracts";
import { useMemo } from "react";
import { addWeeks, addYears, nextWednesday } from "date-fns";
import { formatUnits } from "viem";
import useModal from "@/app/providers/modal.provider";
import { ExtendLockModal } from "@components/extend-lock-modal/extend-lock.modal";

interface LocksListProps extends BaseComponentProps {
  address: string;
}

export const LocksList = ({ address }: LocksListProps) => {
  const chainId = useChainId();
  const { data, refetch } = useSuspenseQuery<{ locks: Lock[] }>(
    GetMyLocksDocument,
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
  const { showModal } = useModal();

  const { data: getLock, refetch } = useReadContract({
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
    if (!lock.lockCreate || !lock.lockCreate[0]?.timestamp) return undefined;
    const startDate = new Date(lock.lockCreate[0]?.timestamp * 1000);
    return nextWednesday(addWeeks(startDate, lock.slope + lock.cliff));
  }, [lock]);

  const reLock = async () => {
    if (!expirationDate) return;
    const minDate = addWeeks(expirationDate!, 4);
    const maxDate = nextWednesday(addYears(expirationDate!, 2));

    await showModal(
      <ExtendLockModal minDate={minDate} maxDate={maxDate} lock={lock} />,
      {
        hideTitle: true,
        closeCallback: refetch,
      },
    );
  };

  return (
    <div className={styles.locksList__row} key={key}>
      <div className={styles.divider}></div>
      <div className={styles.item}>{mentoParsed}</div>
      <div className={styles.item}>{vementoParsed}</div>
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
        {!!expirationDate && (
          <Button className="md:static" block theme="clear" onClick={reLock}>
            Extend lock
          </Button>
        )}
      </div>
    </div>
  );
};
