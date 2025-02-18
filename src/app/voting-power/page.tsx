"use client";
import { useAccount } from "wagmi";
import { ConnectButton, MentoLock } from "@/components/_shared";
import { useLockInfo } from "@/lib/hooks/useLockInfo";
import { LockInfo } from "@/components/lock-info/lock-info.component";
import { Card } from "@mento-protocol/ui-toolkit";

const Page = () => {
  const { address } = useAccount();
  const { hasActiveLock, isLoading, refetch } = useLockInfo(address);

  return (
    <main className="flex flex-col place-items-center gap-14">
      <div className="flex w-full flex-col gap-4 text-center md:gap-6">
        <h2 className="mb-4 mt-[56px] text-[22px]/none font-medium md:text-[32px]/none">
          Your voting power
        </h2>
        {address ? <LockInfo /> : <Disconnected />}
      </div>
      {!hasActiveLock && !isLoading && address && (
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="text-[22px]/none font-medium md:text-[32px]/none">
            Lock MENTO
          </h2>
          <Card
            className="flex min-h-60 items-center justify-center py-10"
            block
          >
            <MentoLock
              onLockConfirmation={() => {
                refetch();
              }}
              className="max-w-[428px]"
            />
          </Card>
        </div>
      )}
    </main>
  );
};

const Disconnected = () => {
  return (
    <Card className="flex flex-col gap-4 ">
      <span className="text-center text-xl">
        To view your locking details or create new locks, please connect your
        wallet
      </span>
      <ConnectButton theme="primary" />
    </Card>
  );
};

export default Page;
