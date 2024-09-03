"use client";
import { useAccount } from "wagmi";
import { Card, ConnectButton, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/index";
import { useLockInfo } from "@/lib/hooks/useLockInfo";

const Page = () => {
  const { address } = useAccount();
  const { hasActiveLock, refetch } = useLockInfo(address);

  return (
    <main className="flex flex-col place-items-center gap-14">
      <div className="flex w-full flex-col gap-4 text-center md:gap-6">
        <h2 className="mb-4 mt-[56px] text-[22px]/none font-medium md:text-[32px]/none">
          Your existing veMENTO lock
        </h2>
        <LocksList />
      </div>
      {!hasActiveLock && (
        <div className="flex w-full flex-col items-center gap-8">
          <h2 className="text-[22px]/none font-medium md:text-[32px]/none">
            Lock MENTO
          </h2>
          <Card
            className="flex min-h-60 items-center justify-center py-10"
            block
          >
            {address ? (
              <MentoLock
                onLockConfirmation={() => {
                  refetch();
                }}
                className="max-w-[428px]"
              />
            ) : (
              <Disconnected />
            )}
          </Card>
        </div>
      )}
    </main>
  );
};

const Disconnected = () => {
  return (
    <div className="flex flex-col gap-4 ">
      <span className="text-xl">Connect Wallet to Lock MENTO</span>
      <ConnectButton theme="primary" />
    </div>
  );
};

export default Page;
