"use client";
import {MentoIcon} from "@components/_icons/mento.icon";
import {MentoTextLogoIcon} from "@components/_icons";
import {Badge, Button, Card} from "@components/_shared";
import {ProposalsListComponent} from "@components/proposals-list/proposals-list.component";

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
                        <div className="flex flex-row justify-start place-items-center gap-default text-3xl font-bold">
                            <MentoIcon/>
                            Mento
                        </div>
                        <div className="flex gap-default">
                            <Button type="clear">
                                Create new proposal
                            </Button>
                            <Button type="clear">
                                My voting power
                            </Button>
                        </div>
                    </div>
                </Card.Header>
                <p>Transparent Digital Asset Solutions</p>
                <div className="flex flex-row gap-default my-4">
                    <Badge rounded type="tertiary">CELO</Badge>
                    <Badge rounded type="secondary">ERC20</Badge>
                    <Badge rounded type="secondary">{(9999999998).toLocaleString()} Supply</Badge>
                </div>
            </Card>

            <ProposalsListComponent/>
        </main>
    )
}
