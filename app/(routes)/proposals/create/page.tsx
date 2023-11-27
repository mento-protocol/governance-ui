"use client";
import {Card, ConnectButton, StepCounter} from "@components/_shared";
import styles from "./page.module.scss";

const Page = () => {

    return <main className="flex flex-col place-items-center">
        <h2 className="text-2xl font-bold mb-5">Create a Proposal</h2>
        <div className={styles.form_wrapper}>
            <Card block>
                <Card.Header>
                    <div className="flex gap-4 items-center">
                        <StepCounter isCard>1</StepCounter>
                        Connect your wallet & login
                    </div>
                </Card.Header>
                <div>
                    <ConnectButton theme="primary">
                        xD
                    </ConnectButton>
                </div>
            </Card>
        </div>
    </main>
}

export default Page;