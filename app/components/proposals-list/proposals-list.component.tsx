import { GetProposals } from "@/app/graphql";
import NumbersService from "@/app/helpers/numbers.service";
import StringService from "@/app/helpers/string.service";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { MentoIcon } from "@components/_icons";
import { Card, ProgressBar } from "@components/_shared";
import { Badge } from "@components/_shared/badge/badge.component";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import IListProposal, {
  stateToBadgeColorMap,
} from "@interfaces/proposal.interface";
import classNames from "classnames";
import Link from "next/link";
import styles from "./proposals-list.module.scss";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({
  className,
  style,
}: ProposalsListProps) => {
  const { data } = useSuspenseQuery(GetProposals);
  const proposals: Array<IListProposal> = data?.proposals.map((proposal) => ({
    id: proposal.proposalId,
    title: proposal.metadata!.title,
    description: proposal.metadata!.description,
    state: proposal.state,
    votesTotal: 0,
    votesYes: 0,
    votesNo: 0,
  }));

  console.log(data?.proposals);

  useProposalStates(data?.proposals);

  return (
    <div className={classNames(styles.wrapper, className)} style={style}>
      <h2 className="text-center mt-x11 mb-x6 font-medium">Proposals</h2>
      <Card block>
        <div className={classNames(styles.proposals_grid, "text_small")}>
          <div
            className={classNames(styles.proposals_grid__row, styles.headers)}
          >
            <div className={styles.header}>Proposal name</div>
            <div className={styles.header}>Status</div>
            <div className={styles.header}>Votes in favour</div>
            <div className={styles.header}>PVotes against</div>
            <div className={styles.header}>Total votes</div>
          </div>
          {proposals.map((proposal, index) => (
            <div key={index} className={classNames(styles.proposals_grid__row)}>
              {!!index && <div className={styles.divider} />}
              <div
                className={classNames(
                  styles.proposals_grid__row__element,
                  styles.first,
                )}
              >
                <div className="flex gap-x1 place-items-center">
                  <div>
                    <MentoIcon />
                  </div>
                  <Link
                    className="flex-1"
                    style={{ maxHeight: "3em" }}
                    href={`/proposals/${proposal.id}`}
                  >
                    <p>
                      {StringService.limitLength(`${proposal.title}`, 75, true)}
                    </p>
                  </Link>
                </div>
              </div>
              <div
                className={classNames(
                  styles.proposals_grid__row__element,
                  "flex justify-center",
                )}
              >
                <Badge
                  className={classNames(styles.status, "uppercase font-medium")}
                  type={stateToBadgeColorMap[proposal.state]}
                >
                  {proposal.state.toString()}
                </Badge>
              </div>
              <div className={classNames(styles.proposals_grid__row__element)}>
                <ProgressBar
                  type="success"
                  className={styles.progress_bar}
                  current={proposal.votesYes}
                  max={proposal.votesTotal}
                  valueFormat="alphabetic"
                />
              </div>
              <div className={classNames(styles.proposals_grid__row__element)}>
                <ProgressBar
                  type="danger"
                  className={styles.progress_bar}
                  current={proposal.votesNo}
                  max={proposal.votesTotal}
                  valueFormat="alphabetic"
                />
              </div>
              <div
                className={classNames(
                  styles.proposals_grid__row__element,
                  styles.last,
                  "mb-3",
                )}
              >
                {NumbersService.parseNumericValue(proposal.votesTotal)}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
