import { proposalsMock } from "@/app/helpers/mocks";
import NumbersService from "@/app/helpers/numbers.service";
import StringService from "@/app/helpers/string.service";
import { Card, ProgressBar } from "@components/_shared";
import { Badge } from "@components/_shared/badge/badge.component";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { statusToBadgeColorMap } from "@interfaces/proposal";
import classNames from "classnames";
import Link from "next/link";
import styles from "./proposals-list.module.scss";

interface ProposalsListProps extends BaseComponentProps {
}

export const ProposalsListComponent = ({className, style}: ProposalsListProps) => {

    const proposals = proposalsMock;

    return (<div className={classNames(styles.wrapper, className)} style={style}>
            <h2 className="text-2xl text-center mt-10 mb-6">Proposals</h2>
            <Card block>
                <div className={classNames(styles.proposals_grid, 'text_small')}>
                    <div className={classNames(styles.proposals_grid__row)}>
                        <div className={classNames(styles.proposals_grid__row__element, styles.header, styles.first)}>
                            Proposal name
                        </div>
                        <div className={classNames(styles.proposals_grid__row__element, styles.header)}>
                            Status
                        </div>
                        <div className={classNames(styles.proposals_grid__row__element, styles.header)}>
                            Votes in favour
                        </div>
                        <div className={classNames(styles.proposals_grid__row__element, styles.header)}>
                            PVotes agains
                        </div>
                        <div className={classNames(styles.proposals_grid__row__element, styles.header, styles.last)}>
                            Total votes
                        </div>
                    </div>
                        {proposals.map((proposal, index) => <div key={index} className={classNames(styles.proposals_grid__row)}>
                            {!!index && <div className={styles.divider}/>}
                            <div className={classNames(styles.proposals_grid__row__element, styles.first)}>
                                <div className="flex gap-default place-items-center">
                                    <div>
                                        {proposal.icon}
                                    </div>
                                    <Link className="flex-1" style={{maxHeight: '3em'}} href={`/proposals/${proposal.id}`}>
                                        <p>{StringService.limitLength(`${proposal.title} - ${proposal.description}`, 75, true)}</p>
                                    </Link>
                                </div>
                            </div>
                            <div className={classNames(styles.proposals_grid__row__element)}>
                                <Badge className="uppercase font-medium"
                                       type={statusToBadgeColorMap[proposal.status]}>{proposal.status.toString()}</Badge>
                            </div>
                            <div className={classNames(styles.proposals_grid__row__element)}>
                                <ProgressBar type="success" className={styles.progress_bar} current={proposal.votesYes}
                                             max={proposal.votesTotal} valueFormat="alphabetic"/>
                            </div>
                            <div className={classNames(styles.proposals_grid__row__element)}>
                                <ProgressBar type="danger" className={styles.progress_bar} current={proposal.votesNo}
                                             max={proposal.votesTotal} valueFormat="alphabetic"/>
                            </div>
                            <div className={classNames(styles.proposals_grid__row__element, styles.last, 'mb-3')}>{NumbersService.parseNumericValue(proposal.votesTotal)}</div>
                        </div>)}
                </div>
            </Card>
        </div>
    );

}