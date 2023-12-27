"use client";
import {MentoIcon} from "@components/_icons/mento.icon";
import {MentoTextLogoIcon} from "@components/_icons";
import {Badge, Button, Card, Divider, DropdownButton, Expandable} from "@components/_shared";
import {ProposalsListComponent} from "@components/proposals-list/proposals-list.component";
import NumbersService from "@/app/helpers/numbers.service";
import {ContractParams} from "@components/contract-params/contract-params.component";
import {useRouter} from "next/navigation";
import { CeloLogoIcon } from "../components/_icons/celo-logo.icon";

const Page = () => {
    const router = useRouter();
    return (
        <main className="flex flex-col place-items-center mt-9">
            <div className="max-w-full">
                <MentoTextLogoIcon className="max-w-full" useThemeColor/>
            </div>
            <h2 className="text-2xl mt-8 mb-4">Claim your part and participate in <br/> shaping the future
                of digital assets</h2>

            <Card className="mt-8" block>
                <Card.Header className="!pb-0">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row justify-start place-items-center gap-x1 text-3xl font-bold">
                            <MentoIcon/>
                            Mento
                        </div>
                        <div className="hidden gap-x1 md:flex">
                            <Button theme="clear" href="/proposals/create">
                                Create new proposal
                            </Button>
                            <Button theme="clear" href="/my-voting-power">
                                My voting power
                            </Button>
                        </div>
                        <DropdownButton className="md:hidden">
                            <DropdownButton.Dropdown>
                                <DropdownButton.Element onClick={() => router.push('/proposals/create')}>
                                    Create new proposal
                                </DropdownButton.Element>
                                <DropdownButton.Element onClick={() => router.push('/my-voting-power')}>
                                    My voting power
                                </DropdownButton.Element>
                            </DropdownButton.Dropdown>
                        </DropdownButton>
                    </div>
                </Card.Header>
                <div className="my-4">
                    <p className="mb-4">Transparent Digital Asset Solutions</p>
                    <div className="flex flex-row gap-x1 ">
                        
                        <Badge rounded type="tertiary"><CeloLogoIcon/>&nbsp;CELO</Badge>
                        <Badge rounded type="secondary">ERC20</Badge>
                        <Badge rounded type="secondary">{(9999999998).toLocaleString()} Supply</Badge>
                    </div>
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