"use client";
import styles from "./page.module.scss";
import {CreateProposalContentStep, CreateProposalWalletStep} from "@components/create-proposal";

interface FormStep {
    isValid: boolean;
    isEnabled: boolean;
}

interface ProposalForm {
    [key: string]: FormStep;
}

const Page = () => {

    return <main className="flex flex-col place-items-center">
        <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
        <div className={styles.form_wrapper}>
            <CreateProposalWalletStep />
            <CreateProposalContentStep />
        </div>
    </main>
}

export default Page;