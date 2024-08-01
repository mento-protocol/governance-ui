"use client";
import { useAccount } from "wagmi";
import { Card, ConnectButton, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/index";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";

const Page = () => {
  const { address } = useAccount();
  const { locks, refetch } = useLocksByAccount({ account: address! });

  return (
    <main className="flex flex-col place-items-center gap-14">
      {address && (
        <div className="flex w-full flex-col gap-4 text-center md:gap-6">
          <h2 className="mb-4 mt-[56px] text-[22px]/none font-medium md:text-[32px]/none">
            Your existing veMENTO lock
          </h2>
          <LocksList locks={locks} onExtend={refetch} account={address} />
        </div>
      )}

      <div className="flex w-full flex-col items-center gap-8">
        <h2 className="text-[32px]/none font-medium">Lock MENTO</h2>
        <Card className="flex min-h-60 items-center justify-center py-10" block>
          {address ? (
            <MentoLock
              onLockConfirmation={() => {
                refetch();
              }}
              className="max-w-[428px]"
            />
          ) : (
            <div className="flex flex-col gap-4 ">
              <span className="text-xl">Connect Wallet to Lock MENTO</span>
              <ConnectButton theme="primary" />
            </div>
          )}
        </Card>
      </div>
    </main>
  );
};

export default Page;
