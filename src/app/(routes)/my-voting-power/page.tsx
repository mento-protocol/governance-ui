"use client";
import { useAccount } from "wagmi";
import { Card, Loader, MentoLock } from "@/components/_shared";
import { LocksList } from "@/components/locks-list/locks-list.component";

const Page = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <main className="flex flex-col place-items-center">
      <h2 className="mb-4 mt-8 text-2xl">My Voting Power</h2>
      <Card block>
        <div className="flex min-w-full flex-col gap-x3 md:flex-row">
          <MentoLock className="max-w-[428px]" />
          <div>TODO: Chart</div>
        </div>
      </Card>
      {!isDisconnected && (
        <>
          <h2 className="mb-4 mt-8 text-2xl">My Locks</h2>
          <Card block>
            {address && !isConnecting && <LocksList account={address} />}
            {isConnecting && <Loader isCenter />}
          </Card>
        </>
      )}
    </main>
  );
};

export default Page;
