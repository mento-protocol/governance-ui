"use client";
import { Card, Loader, MentoLock } from "@components/_shared";
import { LocksList } from "@components/locks-list/locks-list.component";
import { useAccount } from "wagmi";

const Page = () => {
  const { address, isConnecting, isDisconnected } = useAccount();
  return (
    <main className="flex flex-col place-items-center">
      <h2 className="text-[32px] mt-8 mb-x6 leading-[32px] font-medium">
        My Voting Power
      </h2>
      <Card block>
        <div className="flex flex-row min-w-full justify-center overflow-x-auto">
          <MentoLock className="max-w-[428px] w-[100%]" />
        </div>
      </Card>
      {!isDisconnected && (
        <>
          <h2 className="text-[32px] mt-x11 mb-x6 leading-[32px] font-medium">
            My Locks
          </h2>
          <Card block>
            {address && !isConnecting && <LocksList address={address} />}
            {isConnecting && <Loader isCenter />}
          </Card>
        </>
      )}
    </main>
  );
};

export default Page;
