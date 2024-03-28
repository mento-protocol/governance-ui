"use client";
import {
  CreateProposalExecutionStep,
  CreateProposalContentStep,
  CreateProposalWalletStep,
  CreateProposalPreviewStep,
} from "@/components/create-proposal";
import { CreateProposalProvider } from "@/components/create-proposal/create-proposal-provider";

const Page = () => {
  return (
    <CreateProposalProvider>
      <main className="flex flex-col place-items-center">
        <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
        <div className="max-w-4xl w-full flex flex-col items-center justify-center gap-5">
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
