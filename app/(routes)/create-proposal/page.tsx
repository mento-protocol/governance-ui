"use client";
import styles from "./page.module.scss";
import {CreateProposalContentStep, CreateProposalWalletStep} from "@components/create-proposal";
import {CreateProposalProvider} from "@/app/providers/create-proposal.provider";

const Page = () => {
    return <main className="flex flex-col place-items-center">
        <CreateProposalProvider>
            <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
            <div className={styles.form_wrapper}>
                <CreateProposalWalletStep/>
                <CreateProposalContentStep/>
            </div>
        </CreateProposalProvider>
    </main>
}

export default Page;