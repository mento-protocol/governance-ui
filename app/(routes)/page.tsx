"use client";
import {MentoIcon} from "@components/_icons/mento.icon";
import {MentoTextLogoIcon} from "@components/_icons";
import {Button, Card} from "@components/_shared";
import {ProposalsListComponent} from "@components/proposals-list/proposals-list.component";
import {Badge} from "@components/_shared/badge/badge.component";

export default function Home() {
    return (
        <main className="flex flex-col place-items-center p-6">
            <h1>
                <MentoTextLogoIcon/>
            </h1>
            <h2 className="text-xl font-semibold mt-8 mb-4">Claim your part and participate in <br/> shaping the future
                of digital assets</h2>

            <Card className="mt-8" block>
                <Card.Header>
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-start place-items-center gap-2 text-3xl font-bold">
                            <MentoIcon/>
                            Mento
                        </div>
                        <Button type="clear" onClick={() => {
                        }}>
                            Create new proposal
                        </Button>
                    </div>
                </Card.Header>
                <p>Transparent Digital Asset Solutions</p>
                <div className="flex flex-row gap-4 my-4">
                    <Badge type="tertiary">CELO</Badge>
                    <Badge type="secondary">ERC20</Badge>
                    <Badge type="secondary">{(9999999998).toLocaleString()} Supply</Badge>
                </div>
            </Card>

            <ProposalsListComponent/>
        </main>
    )
}
