import { GetProposals, Proposal } from "@/lib/graphql";
import NumbersService from "@/lib/helpers/numbers.service";
import StringService from "@/lib/helpers/string.service";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import { Card, ProgressBar } from "@/components/_shared";
import { Badge } from "@/components/_shared/badge/badge.component";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { stateToBadgeColorMap } from "@/interfaces/proposal.interface";
import classNames from "classnames";
import Link from "next/link";
import { formatUnits, numberToHex } from "viem";
import { useChainId } from "wagmi";
import styles from "./proposals-list.module.scss";
import { useProposalStates } from "@/lib/contracts/governor/useProposalStates";

interface ProposalsListProps extends BaseComponentProps {}

export const ProposalsListComponent = ({
  className,
  style,
}: ProposalsListProps) => {
  const chainId = useChainId();
  const { data } = useSuspenseQuery<{ proposals: Proposal[] }>(GetProposals, {
    queryKey: "GetProposals",
    context: {
      apiName: chainId === 44787 ? "subgraphAlfajores" : "subgraph",
    },
  });

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
            ({ proposalId, metadata, state, votes }, index) => (
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
                  <div className="flex gap-x3 place-items-center">
                    <div className={styles.index}>
                      <Link href={`/proposals/${proposalId}`}>
                        {numberToHex(BigInt(proposalId)).slice(0, 10)}
                      </Link>
                    </div>
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
                    current={Number(formatUnits(votes.for.total, 18))}
                    max={Number(formatUnits(votes.total, 18))}
                    valueFormat="alphabetic"
                  />
                </div>
                <div
                  className={classNames(styles.proposals_grid__row__element)}
                >
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
                  {NumbersService.parseNumericValue(
                    formatUnits(votes.total, 18),
                  )}
                </div>
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  );
};
