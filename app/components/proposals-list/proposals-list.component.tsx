import {Card, ProgressBar} from "@components/_shared";
import styles from "./proposals-list.module.scss";
import classNames from "classnames";
import Proposal, {ProposalStatus} from "@interfaces/proposal";
import {MentoIcon} from "@components/_icons/mento.icon";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {Badge} from "@components/_shared/badge/badge.component";
import {BadgeType} from "@/app/types";
import NumbersService from "@/app/helpers/numbers.service";
import Link from "next/link";

interface ProposalsListProps extends BaseComponentProps{
}

export const ProposalsListComponent = ({className, style}: ProposalsListProps) => {

    const proposals: Proposal[] = [
        {
            id: '599ca521-df39-442f-937c-03b20bcafc2d',
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.active,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100,
            createdAt: new Date(),
            deadlineAt: new Date(),
            creator: 'Andrzej'
        }, {
            id: '599ca521-df39-442f-937c-03b20bcafc2d',
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.active,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100,
            createdAt: new Date(),
            deadlineAt: new Date(),
            creator: 'Andrzej'
        }, {
            id: '599ca521-df39-442f-937c-03b20bcafc2d',
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.active,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100,
            createdAt: new Date(),
            deadlineAt: new Date(),
            creator: 'Andrzej'
        }, {
            id: '599ca521-df39-442f-937c-03b20bcafc2d',
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs: The Rarible Protocol',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.active,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100,
            createdAt: new Date(),
            deadlineAt: new Date(),
            creator: 'Andrzej'
        },
    ];

    const getStatusColor = (status: ProposalStatus): BadgeType => {
        switch (status) {
            case ProposalStatus.active:
                return 'success';
            case ProposalStatus.pending:
                return 'secondary';
            case ProposalStatus.defeated:
                return 'tertiary';
            case ProposalStatus.executed:
                return 'info';
        }
    }

    return (<div className={classNames(styles.wrapper, className)} style={style}>
            <h2 className="text-xl text-center font-semibold mt-10 mb-6">Proposals</h2>
            <Card block>
                <div className={classNames(styles.proposals_grid)}>
                    <div className={classNames(styles.proposals_grid__element, styles.header, styles.first)}>
                        Proposal name
                    </div>
                    <div className={classNames(styles.proposals_grid__element, styles.header)}>
                        Status
                    </div>
                    <div className={classNames(styles.proposals_grid__element, styles.header)}>
                        Votes in favour
                    </div>
                    <div className={classNames(styles.proposals_grid__element, styles.header)}>
                        PVotes agains
                    </div>
                    <div className={classNames(styles.proposals_grid__element, styles.header, styles.last)}>
                        Total votes
                    </div>
                    {proposals.map((proposal, index) => <>
                        {!!index && <div key={`${index}_divider`} className={styles.divider}/>}
                        <div key={`${index}_c0`} className={classNames(styles.proposals_grid__element, styles.first)}>
                            <div className="flex gap-default place-items-center">
                                <div className="flex-1">
                                    {proposal.icon}
                                </div>
                                <Link style={{maxHeight: '3em'}} href={'/proposals/1'}>
                                    <div>{proposal.title} - {proposal.description}</div>
                                </Link>
                            </div>
                        </div>
                        <div key={`${index}_c1`}  className={classNames(styles.proposals_grid__element)}>
                            <Badge className="capitalize" type={getStatusColor(proposal.status)}>{proposal.status.toString()}</Badge>
                        </div>
                        <div key={`${index}_c2`}  className={classNames(styles.proposals_grid__element)}>
                            <ProgressBar type="success" className={styles.progress_bar} current={proposal.votesYes} max={proposal.votesTotal} valueFormat="alphabetic"/>
                        </div>
                        <div key={`${index}_c3`}  className={classNames(styles.proposals_grid__element)}>
                            <ProgressBar type="danger" className={styles.progress_bar} current={proposal.votesNo} max={proposal.votesTotal} valueFormat="alphabetic"/>
                        </div>
                        <div key={`${index}_c4`}  className={classNames(styles.proposals_grid__element, styles.last, 'mb-3')}>{NumbersService.parseNumericValue(proposal.votesTotal)}</div>
                    </>)}
                </div>

            </Card>
        </div>
    );

}