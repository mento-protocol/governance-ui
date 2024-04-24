"use client";
import {
  CreateProposalExecutionStep,
  CreateProposalContentStep,
  CreateProposalWalletStep,
  CreateProposalPreviewStep,
  CreateProposalProvider,
} from "@/components/index";

const Page = () => {
  return (
    <CreateProposalProvider>
      <main className="flex flex-col place-items-center">
        <h2 className="mb-9 text-3xl font-medium">Create a Proposal</h2>
        <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-5">
          <CreateProposalWalletStep />
          <CreateProposalContentStep />
          <CreateProposalExecutionStep />
          <CreateProposalPreviewStep />
        </div>
      </main>
    </CreateProposalProvider>
  );
};

export default Page;
