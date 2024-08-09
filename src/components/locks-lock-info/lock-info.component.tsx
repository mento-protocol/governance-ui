import React from "react";

import { Card } from "../_shared";
import { cn } from "@/styles/helpers";

interface LockInfoProps {
  unlockedMento: string;
  lockedBalance: string;
  expirationDate: string;
  children?: React.ReactNode;
  className?: string;
}

export const LockInfo: React.FC<LockInfoProps> = ({
  unlockedMento,
  lockedBalance,
  expirationDate,
  children,
  className,
}) => (
  <Card
    className={cn(
      "flex flex-col gap-4 md:flex-row md:justify-between md:gap-20",
      className,
    )}
  >
    <div className="flex flex-1 flex-wrap items-end justify-between md:flex-nowrap md:items-stretch">
      <InfoItem title="MENTO" value={unlockedMento} />
      <InfoItem title="veMENTO" value={lockedBalance} />
      <InfoItem title="Expires On" value={expirationDate} />
    </div>
    {children && (
      <div className="flex items-center justify-between md:justify-normal md:gap-4">
        {children}
      </div>
    )}
  </Card>
);

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
  <div className="flex text-[18px]/none font-medium not-italic md:items-center md:justify-center md:text-[22px]/none">
    {children}
  </div>
);

export const LockInfoActions: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <>{children}</>;
