"use client";
import styles from "./page.module.scss";
import {
  CreateProposalExecutionStep,
  CreateProposalContentStep,
  CreateProposalWalletStep,
  CreateProposalPreviewStep,
} from "@components/create-proposal";
import { useEffect, useState } from "react";
import { useCreateProposalStore } from "@/app/store";
import { Loader } from "@components/_shared";

const Page = () => {
  const { reset } = useCreateProposalStore();
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    reset("", "", "");
    setFormLoaded(true);
  }, []);

  return (
    <main className="flex flex-col place-items-center">
      <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
      {!formLoaded && <Loader isCenter />}
      {formLoaded && (
        <div className={styles.form_wrapper}>
          <CreateProposalWalletStep />
          <CreateProposalContentStep />
          <CreateProposalExecutionStep />
          <CreateProposalPreviewStep />
        </div>
      )}
    </main>
  );
};

export default Page;
