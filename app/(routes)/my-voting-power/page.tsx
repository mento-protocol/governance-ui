"use client";
import { Card, Loader, MentoLock } from "@components/_shared";
import { LocksList } from "@components/locks-list/locks-list.component";
import { useAccount } from "wagmi";

const Page = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <main className="flex flex-col place-items-center">
      <h2 className="text-2xl mt-8 mb-4">My Voting Power</h2>
      <Card block>
        <div className="flex flex-col md:flex-row min-w-full gap-x3">
          <MentoLock className="max-w-[428px]" />
          <div>TODO: Chart</div>
        </div>
      </Card>
      {!isDisconnected && (
        <>
          <h2 className="text-2xl mt-8 mb-4">My Locks</h2>
          <Card block>
            {address && !isConnecting && !isDisconnected && (
              <LocksList address={address} />
            )}
            {isConnecting && <Loader isCenter />}
          </Card>
        </>
      )}
    </main>
  );
};

export default Page;
