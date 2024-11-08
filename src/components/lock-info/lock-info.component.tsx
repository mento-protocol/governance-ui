import { format } from "date-fns";
import React, { useMemo } from "react";
import { Button, Card } from "../_shared";
import { useAccount } from "wagmi";
import { WithdrawButton } from "../lock-withdraw/withdraw-button";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { ManageLockButton } from "../lock-manage-lock/manage-lock-button/manage-lock-button.component";
import useTokens from "@/lib/contracts/useTokens";
import { formatUnits } from "viem";

export const LockInfo = () => {
  const { address } = useAccount();
  const { lock, unlockedMento, hasLock, hasMultipleLocks } =
    useLockInfo(address);
  const { veMentoBalance } = useTokens();

  const noVotingPower = veMentoBalance.value === BigInt(0);

  const formattedVeMentoBalance = useMemo(() => {
    return Number(formatUnits(veMentoBalance.value, 18)).toLocaleString();
  }, [veMentoBalance.value]);
  const formattedUnlockedMentoBalance = useMemo(() => {
    return Number(unlockedMento).toLocaleString();
  }, [unlockedMento]);

  if (!address) {
    return (
      <Card block>
        <div className="text-center">
          Your lock will appear here. Connect your wallet to view it.
        </div>
      </Card>
    );
  }

  if (!hasLock && noVotingPower) {
    return (
      <Card block>
        <div className="text-center">You have no existing locks</div>
      </Card>
    );
  }

  if (!lock) {
    return <>loading...</>;
  }

  const parsedExpirationDate = hasLock
    ? format(lock?.expiration, "dd/MM/yyyy")
    : "-";

  return (
    <Card className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-20">
      <div className="flex flex-1 flex-wrap items-end justify-between md:flex-nowrap md:items-stretch">
        <InfoItem title="MENTO" value={formattedUnlockedMentoBalance} />
        <InfoItem title="veMENTO" value={formattedVeMentoBalance} />
        <InfoItem title="Expires On" value={parsedExpirationDate} />
      </div>
      <div className="flex items-center justify-between md:justify-normal md:gap-4">
        <WithdrawButton />
        {hasMultipleLocks ? (
          <Button theme={"clear"} disabled>
            Manage Lock
          </Button>
        ) : (
          <ManageLockButton lock={lock} />
        )}
      </div>
    </Card>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="flex flex-col gap-4 md:gap-6">
    <LockTableTitle>{title}</LockTableTitle>
    <LockTableValue>{value}</LockTableValue>
  </div>
);

const LockTableTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="font-inter text-base/[24px] font-medium not-italic text-gray-dark">
    {children}
  </div>
);

const LockTableValue: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div className="flex h-full text-[18px]/none font-medium not-italic md:items-center md:justify-center md:text-[22px]/none">
    {children}
  </div>
);