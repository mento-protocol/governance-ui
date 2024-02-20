import styles from "./locks-list.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { Button, DropdownButton } from "@components/_shared";
import classNames from "classnames";
import { GetLocksDocument, Lock } from "@/app/graphql";
import { useSuspenseQuery } from "@apollo/client";
import { useReadContract } from "wagmi";
import { LockingABI } from "@/app/abis/Locking";
import { useContracts } from "@/app/hooks/useContracts";
import { useMemo } from "react";
import { addWeeks, format, nextWednesday } from "date-fns";
import { formatUnits } from "viem";

interface LocksListProps extends BaseComponentProps {
  address: string;
}

export const LocksList = ({ address }: LocksListProps) => {
  const { data } = useSuspenseQuery<{ locks: Lock[] }>(GetLocksDocument, {
    variables: { address },
  });

  console.log(data);

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
      {data?.locks?.map((lock) => <LockEntry lock={lock} key={lock.lockId} />)}
    </div>
  );
};

const LockEntry = ({ lock, key }: { lock: Lock; key: string | number }) => {
  const contracts = useContracts();
  const { data: getLock } = useReadContract({
    address: contracts.Locking.address,
    abi: LockingABI,
    functionName: "getLock",
    args: [lock.amount, lock.slope, lock.cliff],
  });

  const mentoParsed = useMemo(() => {
    const formattedAmount = formatUnits(lock.amount || 0n, 15);
    const decimalsSplit = formattedAmount.split(".");

    return `${decimalsSplit[0]}${decimalsSplit[1] ? `.${decimalsSplit[1].slice(0, 3)}` : ""}T`;
  }, [lock.amount]);

  const vementoParsed = useMemo(() => {
    const formattedLockAmount = formatUnits(getLock?.[0] || 0n, 15);
    const decimalsSplit = formattedLockAmount.split(".");

    return `${decimalsSplit[0]}${decimalsSplit[1] ? `.${decimalsSplit[1].slice(0, 3)}` : ""}T`;
  }, [getLock]);

  const expirationDate = useMemo(() => {
    const startDate = new Date(lock.lockCreate[0].timestamp * 1000);
    const endDate = nextWednesday(addWeeks(startDate, lock.slope + lock.cliff));
    return `${endDate.toLocaleDateString()} (${format(endDate, "E")})`;
  }, [lock]);

  return (
    <div className={styles.locksList__row} key={key}>
      <div className={styles.divider}></div>
      <div className={styles.item}>{mentoParsed}</div>
      <div className={styles.item}>{vementoParsed}</div>
      <div className={styles.item}>{expirationDate}</div>
      <div>
        <DropdownButton className="md:hidden" theme="clear">
          <DropdownButton.Dropdown>
            <DropdownButton.Element onClick={() => {}}>
              Extend lock
            </DropdownButton.Element>
          </DropdownButton.Dropdown>
        </DropdownButton>
        <Button className="md:static" block theme="clear">
          Extend lock
        </Button>
      </div>
    </div>
  );
};
