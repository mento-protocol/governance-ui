"use client";
import { useAccount } from "wagmi";
import { Card, Loader, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/index";
import useLocksByAccount from "@/lib/contracts/locking/useLocksByAccount";

const Page = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { locks, refetch } = useLocksByAccount({ account: address! });
  return (
    <main className="flex flex-col place-items-center">
      <h2 className="mb-4 mt-8 text-2xl">My Voting Power</h2>
      <Card className="flex items-center justify-center py-10" block>
        <MentoLock
          onLockConfirmation={() => {
            refetch();
          }}
          className="max-w-[428px]"
        />
      </Card>
      {!isDisconnected && (
        <>
          <h2 className="mb-4 mt-8 text-2xl">My Locks</h2>
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
