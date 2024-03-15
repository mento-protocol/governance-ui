"use client";
import { useEffect } from "react";
import {
  CreateProposalExecutionStep,
  CreateProposalContentStep,
  CreateProposalWalletStep,
  CreateProposalPreviewStep,
} from "@components/create-proposal";
import { useCreateProposalStore } from "@lib/store";
import styles from "./page.module.scss";

const Page = () => {
  // TODO: Nuke proposal form from state
  const { reset } = useCreateProposalStore();

  useEffect(() => {
    reset();
  }, [reset]);

  return (
    <main className="flex flex-col place-items-center">
      <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
      <div className={styles.form_wrapper}>
        <CreateProposalWalletStep />
        <CreateProposalContentStep />
        <CreateProposalExecutionStep />
        <CreateProposalPreviewStep />
      </div>
    </main>
  );
};

export default Page;
