import { Card, TabList } from "@/components/_shared";
import { VotesList } from "@/components/votes-list/votes-list.component";
import type { ProposalVotes } from "@/lib/graphql";

type Props = {
  votes: ProposalVotes;
};

export default function Participants({ votes }: Props) {
  return (
    <Card
      // Was originally z-49
      className="sticky grow bottom-0 w-full z-40"
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
