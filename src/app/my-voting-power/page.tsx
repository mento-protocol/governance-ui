"use client";
import { useAccount } from "wagmi";
import { Card, ConnectButton, Loader, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/index";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";
import React from "react";

const Page = () => {
  const { address, isConnecting } = useAccount();
  const { locks, refetch } = useLocksByAccount({ account: address! });

  return (
    <main className="flex flex-col place-items-center">
      <h2 className="mb-4 mt-8 text-[32px]/none font-medium">
        My Voting Power
      </h2>
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
      {address && (
        <>
          <h2 className="mb-4 mt-[56px] text-[32px]/none font-medium">
            My Locks
          </h2>
          <Card block>
            {address && !isConnecting && (
              <LocksList locks={locks} onExtend={refetch} account={address} />
            )}
            {isConnecting && <Loader isCenter />}
          </Card>
        </>
      )}
    </main>
  );
};

export default Page;
