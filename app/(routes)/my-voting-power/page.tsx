"use client";
import { Card, MentoLock } from "@components/_shared";
import { LocksList } from "@components/locks-list/locks-list.component";

const Page = () => {
  return (
    <main className="flex flex-col place-items-center">
      <h2 className="text-2xl mt-8 mb-4">My Voting Power</h2>
      <Card block>
        <div className="flex flex-col md:flex-row min-w-full gap-x3">
          <MentoLock className="max-w-[428px]" />
          <div>TODO: Chart</div>
        </div>
      </Card>
      <h2 className="text-2xl mt-8 mb-4">My Locks</h2>
      <Card block>
        <LocksList />
      </Card>
    </main>
  );
};

export default Page;
