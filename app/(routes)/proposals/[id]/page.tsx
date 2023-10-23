"use client";

import {MentoIcon} from "@components/_icons";
import Proposal, {ProposalStatus, statusToBadgeColorMap} from "@interfaces/proposal";
import addDays from "date-fns/addDays";
import classNames from "classnames";
import {Badge} from "@components/_shared";
import {Countdown} from "@components/countdown/countdown.component";

const Page = () => {

    const proposal: Proposal = {
        id: '599ca521-df39-442f-937c-03b20bcafc2d',
        icon: <MentoIcon/>,
        title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        status: ProposalStatus.active,
        votesYes: 2700,
        votesNo: 1400,
        votesTotal: 4100,
        createdAt: addDays(new Date(), Math.round(Math.random() * 10) * -1),
        deadlineAt: addDays(new Date(), Math.round(Math.random() * 10)),
        creator: 'Andrzej'
    }

    return <main className="flex flex-col place-items-center">
        <div>
            <Badge className="capitalize mb-3"
                   type={statusToBadgeColorMap[proposal.status]}>{proposal.status.toString()}</Badge>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-default">
                <div className="col-start-1 md:col-span-4">

                    <h1 className="text-5xl font-semibold">{proposal.title}</h1>
                </div>
                <div className="col-start-5 md:col-span-3">
                    <Countdown end={proposal.deadlineAt} countDownMilliseconds={1000}/>
                </div>
            </div>
        </div>
    </main>
}

export default Page;