import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import styles from "./proposals-list.module.scss";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";
import classNames from "classnames";
import { Card, ProgressBar, Status } from "@/components/_shared";
import Link from "next/link";
import { stateToStatusColorMap } from "@/lib/interfaces/proposal.interface";
import { formatUnits } from "viem";
import useProposals from "@/lib/contracts/governor/useProposals";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({
  className,
  style,
}: ProposalsListProps) => {
  const { proposals } = useProposals();

  return (
    <div className={classNames("w-full font-fg", className)} style={style}>
      <h2 className="mb-x6 mt-x11 text-center font-medium">Proposals</h2>
      <Card block>
        <div
          className={classNames(
            styles.proposals_grid,
            "text_small overflow-auto ",
          )}
        >
          <div
            className={classNames(
              styles.proposals_grid__row,
              styles.headers,
              "font-inter",
            )}
          >
            <div className={classNames(styles.header)}>Proposal name</div>
            <div className={styles.header}>Status</div>
            <div className={styles.header}>Votes in favor</div>
            <div className={styles.header}>Votes against</div>
            <div className={styles.header}>Total votes</div>
          </div>
          {proposals.map(({ proposalId, metadata, state, votes }, index) => (
            <div key={index} className={classNames(styles.proposals_grid__row)}>
              {!!index && <div className={styles.divider} />}
              <div
                className={classNames(
                  styles.proposals_grid__row__element,
                  styles.first,
                )}
              >
                <div className="flex place-items-center gap-x3">
                  <Link
                    className="flex-1"
                    style={{ maxHeight: "3em" }}
                    href={`/proposals/${proposalId}`}
                  >
                    <p>
                      {StringService.limitLength(
                        `${metadata?.title}`,
                        75,
                        true,
                      )}
                    </p>
                  </Link>
                </div>
              </div>
              <Status
                text={state?.toString()}
                type={stateToStatusColorMap[state]}
              />
              <div className={classNames(styles.proposals_grid__row__element)}>
                <ProgressBar
                  type="success"
                  className={styles.progress_bar}
                  current={Number(formatUnits(votes.for.total, 18))}
                  max={Number(formatUnits(votes.total, 18))}
                  valueFormat="alphabetic"
                />
              </div>
              <div className={classNames(styles.proposals_grid__row__element)}>
                <ProgressBar
                  type="danger"
                  className={styles.progress_bar}
                  current={Number(formatUnits(votes.against.total, 18))}
                  max={Number(formatUnits(votes.total, 18))}
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
                {NumbersService.parseNumericValue(formatUnits(votes.total, 18))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
