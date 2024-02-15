import { Card, TabList } from "@/app/components/_shared";
import { VotesList } from "@/app/components/votes-list/votes-list.component";
import type { ProposalVotes } from "@/app/graphql";
import classNames from "classnames";
import styles from "../page.module.scss";

type Props = {
  votes: ProposalVotes;
  participantsModalActive: boolean;
  setParticipantsModelActive: (active: boolean) => void;
};

export default function Participants({
  participantsModalActive,
  setParticipantsModelActive,
  votes,
}: Props) {
  return (
    <div
      className={classNames(
        styles.backdrop,
        participantsModalActive && styles.opened,
      )}
    >
      <Card
        className={classNames(
          styles.proposal_addon,
          participantsModalActive && styles.opened,
          styles.participantsList,
          "mt-5",
        )}
      >
        <Card.Header className="text-center text-2xl">
          <strong>Participants</strong>
          <button
            className={styles.proposal_addon__close}
            onClick={() => setParticipantsModelActive(false)}
          >
            X
          </button>
        </Card.Header>
        <TabList tabs={["For", "Against", "Abstain"]}>
          <VotesList voteType="for" votes={votes} />
          <VotesList voteType="against" votes={votes} />
          <VotesList voteType="abstain" votes={votes} />
        </TabList>
      </Card>
    </div>
  );
}
