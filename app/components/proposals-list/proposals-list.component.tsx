import {Card} from "@components/_shared";
import styles from "./proposals-list.module.scss";
import classNames from "classnames";
import Proposal, {ProposalStatus} from "@interfaces/proposal";
import {MentoIcon} from "@components/_icons/mento.icon";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import {Badge} from "@components/_shared/badge/badge.component";
import {BadgeType} from "@/app/types";

interface ProposalsListProps extends BaseComponentProps{
}

export const ProposalsListComponent = ({className, style}: ProposalsListProps) => {

    const proposals: Proposal[] = [
        {
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs:',
            description: 'The Rarible Protocol - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.active,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100
        }, {
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs:',
            description: 'The Rarible Protocol - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.pending,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100
        }, {
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs:',
            description: 'The Rarible Protocol - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.defeated,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100
        }, {
            icon: <MentoIcon/>,
            title: 'Building  the Building the Future of NFTs:',
            description: 'The Rarible Protocol - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            status: ProposalStatus.executed,
            votesYes: 2700,
            votesNo: 1400,
            votesTotal: 4100
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
            <h2 className="text-xl font-semibold mt-10 mb-6">Proposals</h2>
            <Card block>
                <div className={classNames(styles.proposals_row, styles.header)}>
                    <div className={classNames(styles.proposals_row__element, styles.first)}>
                        Proposal name
                    </div>
                    <div className={classNames(styles.proposals_row__element)}>
                        Status
                    </div>
                    <div className={classNames(styles.proposals_row__element)}>
                        Votes in favour
                    </div>
                    <div className={classNames(styles.proposals_row__element)}>
                        PVotes agains
                    </div>
                    <div className={classNames(styles.proposals_row__element, styles.last)}>
                        Total votes
                    </div>
                </div>
                {proposals.map((proposal, index) => <div key={index} className={styles.proposals_row}>
                    <div className={classNames(styles.proposals_row__element, styles.first)}>
                        <div className="flex gap-default">
                            <div className="flex-1">
                                {proposal.icon}
                            </div>
                            <div>
                                <div className={styles.title}>{proposal.title}</div>
                                <div className={styles.description}>{proposal.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classNames(styles.proposals_row__element)}>
                        <Badge className="capitalize" type={getStatusColor(proposal.status)}>{proposal.status.toString()}</Badge>
                    </div>
                    <div className={classNames(styles.proposals_row__element)}>{proposal.votesYes}</div>
                    <div className={classNames(styles.proposals_row__element)}>{proposal.votesNo}</div>
                    <div className={classNames(styles.proposals_row__element, styles.last)}>{proposal.votesTotal}</div>
                </div>)}
            </Card>
        </div>

    );

}