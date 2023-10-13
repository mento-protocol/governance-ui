"use client";
import {MentoIcon} from "@components/_icons/mento.icon";
import {MentoTextLogoIcon} from "@components/_icons";
import {Badge, Button, Card, Divider, Expandable} from "@components/_shared";
import {ProposalsListComponent} from "@components/proposals-list/proposals-list.component";
import NumbersService from "@/app/helpers/numbers.service";
import {ContractParams} from "@components/contract-params/contract-params.component";

const Page = () => {
    return (
        <main className="flex flex-col place-items-center">
            <h1>
                <MentoTextLogoIcon useThemeColor/>
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
                            <Button type="clear" href="/my-voting-power">
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
                <Divider/>
                <Expandable header={'Contract parameters'}>
                    <ContractParams/>
                </Expandable>
            </Card>

            <Card className="mt-8" block>
                <div className="grid grid-cols-2 md:grid-cols-4">
                    <div className="flex flex-col justify-center place-items-center">
                        <div className="text-2xl font-semibold">11</div>
                        <div className="text-sm font-light">Total proposals</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center">
                        <div className="text-2xl font-semibold">3</div>
                        <div className="text-sm font-light">Active proposals</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center">
                        <div className="text-2xl font-semibold">{NumbersService.parseNumericValue(2097, 3)}</div>
                        <div className="text-sm font-light">Voters</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center">
                        <div className="text-2xl font-semibold">{NumbersService.parseNumericValue(120340, 3)}</div>
                        <div className="text-sm font-light">Total veMento<br/>Voting Power</div>
                    </div>
                </div>
            </Card>

            <ProposalsListComponent/>
        </main>
    )
}


export default Page;