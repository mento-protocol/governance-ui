import { GetProposals } from "@/app/graphql";
import NumbersService from "@/app/helpers/numbers.service";
import StringService from "@/app/helpers/string.service";
import { useProposalStates } from "@/app/hooks/useProposalStates";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { MentoIcon } from "@components/_icons";
import { Card, ProgressBar } from "@components/_shared";
import { Badge } from "@components/_shared/badge/badge.component";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import IProposal, {
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
  // const { isFetching, proposals, fetch } = useProposalsListStore();
  const { data } = useSuspenseQuery(GetProposals);

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
            <div className={styles.header}>Votes in favor</div>
            <div className={styles.header}>Votes against</div>
            <div className={styles.header}>Total votes</div>
          </div>
          {data?.proposals.map(
            (
              { id, metadata, state, votesFor, votesAgainst, votesTotal },
              index,
            ) => (
              <div
                key={index}
                className={classNames(styles.proposals_grid__row)}
              >
                {!!index && <div className={styles.divider} />}
                <div
                  className={classNames(
                    styles.proposals_grid__row__element,
                    styles.first,
                  )}
                >
                  <div className="flex gap-x1 place-items-center">
                    <div>{index + 1 <= 9 ? `0${index + 1}` : index + 1}</div>
                    <Link
                      className="flex-1"
                      style={{ maxHeight: "3em" }}
                      href={`/proposals/${id}`}
                    >
                      <p>
                        {StringService.limitLength(
                          `${metadata.title}`,
                          75,
                          true,
                        )}
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
                    className={classNames(
                      styles.status,
                      "uppercase font-medium",
                    )}
                    type={stateToBadgeColorMap[state]}
                  >
                    {state?.toString()}
                  </Badge>
                </div>
                <div
                  className={classNames(styles.proposals_grid__row__element)}
                >
                  <ProgressBar
                    type="success"
                    className={styles.progress_bar}
                    current={votesFor}
                    max={votesTotal}
                    valueFormat="alphabetic"
                  />
                </div>
                <div
                  className={classNames(styles.proposals_grid__row__element)}
                >
                  <ProgressBar
                    type="danger"
                    className={styles.progress_bar}
                    current={votesAgainst}
                    max={votesTotal}
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
                  {NumbersService.parseNumericValue(votesTotal)}
                </div>
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  );
};
