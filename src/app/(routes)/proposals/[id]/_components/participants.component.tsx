import classNames from "classnames";
import { Card, TabList } from "@/components/_shared";
import { VotesList } from "@/components/votes-list/votes-list.component";
import type { ProposalVotes } from "@/lib/graphql";
import styles from "../page.module.scss";

type Props = {
  votes: ProposalVotes;
};

export default function Participants({ votes }: Props) {
  return (
    <Card
      className={classNames(styles.proposal_addon, styles.participantsList)}
    >
      <Card.Header className="text-center text-2xl">
        <strong>Participants</strong>
      </Card.Header>
      <TabList tabs={["For", "Against", "Abstain"]}>
        <VotesList voteType="for" votes={votes} />
        <VotesList voteType="against" votes={votes} />
        <VotesList voteType="abstain" votes={votes} />
      </TabList>
    </Card>
  );
}
