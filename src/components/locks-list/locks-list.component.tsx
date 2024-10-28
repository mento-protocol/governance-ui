import { format } from "date-fns";
import React from "react";
import { Card } from "../_shared";
import { useAccount } from "wagmi";
import { WithdrawButton } from "../withdraw/withdraw-button";
import {
  LockInfo,
  LockInfoActions,
} from "../locks-lock-info/lock-info.component";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { RelockForm } from "./locks-relock-form/relock-form.component";
import useTokens from "@/lib/contracts/useTokens";
import { formatUnits } from "viem";

export const LocksList = () => {
  const { address } = useAccount();
  const { lock, unlockedMento, hasLock } = useLockInfo(address);
  const { veMentoBalance } = useTokens();

  const noVotingPower = veMentoBalance.value < BigInt(0);

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
    <LockInfo
      unlockedMento={unlockedMento}
      lockedBalance={Number(
        formatUnits(veMentoBalance.value, 18),
      ).toLocaleString()}
      expirationDate={parsedExpirationDate}
    >
      <LockInfoActions>
        <WithdrawButton />
        <RelockForm lock={lock} />
      </LockInfoActions>
    </LockInfo>
  );
};
