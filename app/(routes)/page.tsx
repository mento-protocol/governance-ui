"use client";
import { MentoIcon } from "@components/_icons/mento.icon";
import { MentoTextLogoIcon } from "@components/_icons";
import { Badge, Button, Card, Divider, DropdownButton, Expandable } from "@components/_shared";
import { ProposalsListComponent } from "@components/proposals-list/proposals-list.component";
import NumbersService from "@/app/helpers/numbers.service";
import { ContractParams } from "@components/contract-params/contract-params.component";
import { useRouter } from "next/navigation";
import { CeloLogoIcon } from "../components/_icons/celo-logo.icon";

const Page = () => {
    const router = useRouter();
    return (
        <main className="flex flex-col place-items-center mt-x11">
            <div className="max-w-full">
                <MentoTextLogoIcon className="max-w-full" useThemeColor />
            </div>
            <h2 className="font-size-x6 line-height-x6 mt-x6 font-medium">Claim your part and participate in<br /> shaping the future
                of digital assets</h2>

            <Card className="mt-x11" block>
                <Card.Header className="!pb-0">
                    <div className="flex flex-row justify-between items-center">
                        <div className="flex flex-row justify-start place-items-center gap-x3 font-bold font-size-x6 sm:font-size-x11">
                            <MentoIcon />
                            Mento
                        </div>
                        <div className="hidden gap-x3 md:flex">
                            <Button theme="clear" href="/create-proposal">
                                Create new proposal
                            </Button>
                            <Button theme="clear" href="/my-voting-power">
                                My voting power
                            </Button>
                        </div>
                        <DropdownButton className="md:hidden">
                            <DropdownButton.Dropdown>
                                <DropdownButton.Element onClick={() => router.push('/create-proposal')}>
                                    Create new proposal
                                </DropdownButton.Element>
                                <DropdownButton.Element onClick={() => router.push('/my-voting-power')}>
                                    My voting power
                                </DropdownButton.Element>
                            </DropdownButton.Dropdown>
                        </DropdownButton>
                    </div>
                </Card.Header>
                <div className="my-x6">

                    <p className="mb-x6 text-x4">Transparent Digital Asset Solutions</p>
                    <div className="flex flex-wrap flex-row gap-x3">

                        <Badge rounded type="tertiary"><CeloLogoIcon />&nbsp;CELO</Badge>
                        <Badge rounded type="secondary">ERC20</Badge>
                        <Badge rounded type="secondary">{(9999999998).toLocaleString()} Supply</Badge>
                    </div>
                </div>
                <Divider />
                <Expandable header={'Contract parameters'} className="font-medium font-size-x4">
                    <ContractParams />
                </Expandable>
            </Card>

            <Card className="mt-8" block>
                <div className="flex flex-wrap gap-x6 m-x4 mr-x6 ml-x6 justify-between">
                    <div className="flex flex-col justify-center place-items-center gap-x2">
                        <div className="font-size-x6 line-height-x6 font-medium">11</div>
                        <div className="font-size-x3">Total proposals</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center gap-x2">
                        <div className="font-size-x6 line-height-x6 font-medium">3</div>
                        <div className="font-size-x3">Active proposals</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center gap-x2">
                        <div className="font-size-x6 line-height-x6 font-medium">{NumbersService.parseNumericValue(2097, 3)}</div>
                        <div className="font-size-x3">Voters</div>
                    </div>
                    <div className="flex flex-col justify-center place-items-center gap-x2">
                        <div className="font-size-x6 line-height-x6 font-medium">{NumbersService.parseNumericValue(120340, 3)}</div>
                        <div className="font-size-x3">Total veMento<br />Voting Power</div>
                    </div>
                </div>
            </Card>

            <ProposalsListComponent />
        </main>
    )
}


export default Page;