import { format } from "date-fns";
import React, { useMemo } from "react";
import { Card } from "../_shared";
import { useAccount } from "wagmi";
import { WithdrawButton } from "../lock-withdraw/withdraw-button";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { ManageLockButton } from "../lock-manage-lock/manage-lock-button/manage-lock-button.component";
import useTokens from "@/lib/contracts/useTokens";
import { formatUnits } from "viem";
// import { LockInfoSkeleton } from "./lock-info-skeleton.component";
import { cn } from "@/styles/helpers";
import NumbersService from "@/lib/helpers/numbers.service";

export const LockInfo = () => {
  const { address } = useAccount();
  const { lock, unlockedMento, hasLock, lockedBalance } = useLockInfo(address);
  const { veMentoBalance } = useTokens();

  const noVotingPower = veMentoBalance.value === BigInt(0);

  const formattedVeMentoBalance = useMemo(() => {
    return NumbersService.parseNumericValue(
      formatUnits(veMentoBalance.value, 18),
    );
  }, [veMentoBalance.value]);
  const formattedUnlockedMentoBalance = useMemo(() => {
    return Number(unlockedMento).toLocaleString();
  }, [unlockedMento]);

  const delegatedBalance = useMemo(() => {
    if (lockedBalance === undefined) {
      return 0;
    }
    return NumbersService.parseNumericValue(
      Number(formatUnits(veMentoBalance.value, 18)) - Number(lockedBalance),
    );
  }, [veMentoBalance.value, lockedBalance]);

  // const nonDelegatedBalance = useMemo(() => {
  //   return Number(formatUnits(veMentoBalance.value, 18)) - delegatedBalance;
  // }, [veMentoBalance.value, delegatedBalance]);

  // if (isLoading) {
  //   return <LockInfoSkeleton />;
  // }

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

  const parsedExpirationDate = hasLock
    ? format(lock?.expiration, "dd/MM/yyyy")
    : "-";

  return (
    <>
      <Card className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Top Left - veMENTO */}

          <div className="flex flex-col gap-2 md:gap-4">
            <LockTableTitle className="justify-left items-start text-left md:items-start md:text-left">
              Total voting power
            </LockTableTitle>
            <div className="p-0 text-left text-[24px]/none font-medium not-italic">
              {`${formattedVeMentoBalance} veMENTO`}
            </div>
          </div>

          {/* Top Right - Lock Details */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <InfoItem
                title="Locked MENTO"
                value={formattedUnlockedMentoBalance}
              />
              <InfoItem
                title="Withdrawable"
                value={formattedUnlockedMentoBalance}
              />
              <InfoItem title="Expires On" value={parsedExpirationDate} />
            </div>
          </div>

          {/* Bottom Left - Delegation Info */}
          <div className="flex flex-col items-start gap-1">
            <div className="text-gray-dark">Delegated to you</div>
            <span className="text-md font-medium">
              {`${delegatedBalance} veMENTO`}
            </span>
          </div>

          {/* Bottom Right - Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <ManageLockButton lock={lock} />
            <WithdrawButton />
          </div>
        </div>
      </Card>
    </>
  );
};

const InfoItem: React.FC<{ title: string; value: string }> = ({
  title,
  value,
}) => (
  <div className="flex flex-col gap-4">
    <LockTableTitle>{title}</LockTableTitle>
    <LockTableValue>{value}</LockTableValue>
  </div>
);

const LockTableTitle: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn(
      "font-inter text-base/[24px] font-medium not-italic text-gray-dark",
      className,
    )}
  >
    {children}
  </div>
);

const LockTableValue: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn(
      "flex h-full text-[18px]/none font-medium not-italic md:items-center md:justify-center md:text-[22px]/none",
      className,
    )}
  >
    {children}
  </div>
);
