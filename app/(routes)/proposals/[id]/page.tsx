"use client";

import {MentoIcon} from "@components/_icons";
import Proposal, {ProposalStatus, statusToBadgeColorMap} from "@interfaces/proposal";
import addDays from "date-fns/addDays";
import classNames from "classnames";
import {Avatar, Badge, Button, Card, Input} from "@components/_shared";
import {Countdown} from "@components/countdown/countdown.component";
import {format} from "date-fns";
import Validators from "@/app/helpers/validators";
import {useState} from "react";
import {singleProposal} from "@/app/helpers/mocks";

const Page = () => {

    const [votePowerSelected, setVotePowerSelected] = useState(0)

    const proposal = singleProposal;

    return <main className="flex flex-col place-items-center">
        <div>
            <Badge className="capitalize mb-3"
                   type={statusToBadgeColorMap[proposal.status]}>{proposal.status.toString()}</Badge>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-default ">
                <div className="col-start-1 md:col-span-4">
                    <h1 className="text-5xl font-semibold">{proposal.title}</h1>
                </div>
                <div className="col-start-5 md:col-span-3">
                    <Countdown end={proposal.deadlineAt} countDownMilliseconds={1000}/>
                </div>
            </div>
            <div className="flex flex-wrap place-items-center justify-between mt-8 gap-default-x4">
                <div className="flex place-items-center gap-1">
                    <Avatar/>
                    <div>by {proposal.creator}</div>
                </div>
                <div className="flex place-items-center gap-1">
                    <code>ID</code>
                    <div>{`${proposal.id.substring(0, 6)}...${proposal.id.substring(proposal.id.length - 4)}`}</div>
                </div>
                <div className="flex place-items-center gap-1">
                    <span>Proposed on:</span>
                    <strong>{format(proposal.createdAt, 'MMMM do, yyyy')}</strong>
                </div>
                <div className="flex place-items-center gap-1">
                    <span>Voting deadline:</span>
                    <strong>{format(proposal.deadlineAt, 'MMMM do, yyyy')}</strong>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-4 place-items-start gap-default">
                <div className="md:col-span-3">
                    <h3>Details</h3>
                    <div dangerouslySetInnerHTML={{__html: proposal.description}}/>
                </div>
                <div className="sticky top-40 min-w-full">
                    <Card>
                        <Card.Header>
                            <strong>Voting</strong>
                        </Card.Header>
                        <div className="flex flex-col gap-1">

                            <Input label="Voting power"
                                   id="voting-power"
                                   type="number"
                                   max={400}
                                   unit="MENT"
                                   placeholder="Voting power"
                                   validators={[Validators.required(), Validators.max(400)]}
                                   value={votePowerSelected} onChange={setVotePowerSelected}/>
                            <Button type="success" block onClick={e => {
                            }}>
                                For
                            </Button>
                            <Button type="danger" block onClick={e => {
                            }}>
                                Against
                            </Button>
                            <Button type="tertiary" block onClick={e => {
                            }}>
                                Abstain
                            </Button>
                        </div>
                    </Card>
                    <Card className="mt-5">
                        <Card.Header>
                            <strong>Votes</strong>
                        </Card.Header>
                    </Card>
                </div>
            </div>
        </div>
    </main>
}

export default Page;