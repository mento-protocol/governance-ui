"use client";
import styles from "./page.module.scss";
import {
  CreateProposalExecutionStep,
  CreateProposalContentStep,
  CreateProposalWalletStep,
  CreateProposalPreviewStep,
} from "@components/create-proposal";
import { useLayoutEffect, useState } from "react";
import { useCreateProposalStore } from "@/app/store";
import useModal from "@/app/providers/modal.provider";
import { Loader } from "@components/_shared";

const Page = () => {
  const { reset } = useCreateProposalStore();
  const { showConfirm } = useModal();
  const [formLoaded, setFormLoaded] = useState(false);

  useLayoutEffect(() => {
    const cacheTitle = localStorage.getItem("proposalTitle");
    const cacheDescription = localStorage.getItem("proposalDescription");
    const cacheExecutionCode = localStorage.getItem("proposalExecutionCode");

    if (cacheTitle || cacheDescription || cacheExecutionCode) {
      setFormLoaded(false);
      localStorage.removeItem("proposalTitle");
      localStorage.removeItem("proposalDescription");
      localStorage.removeItem("proposalExecutionCode");
      showConfirm("Do you want to load the cached proposal?").then((res) => {
        reset(
          res ? cacheTitle || "" : "",
          res ? cacheDescription || "" : "",
          res ? cacheExecutionCode || "" : "",
        );
        setFormLoaded(true);
      });
    } else {
      reset("", "", "");
      setFormLoaded(true);
    }
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
