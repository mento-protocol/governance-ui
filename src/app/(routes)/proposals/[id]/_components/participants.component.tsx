import { Card, TabList } from "@/components/_shared";
import { VotesList } from "@/components/index";
import type { ProposalVotes } from "@/lib/graphql";

type Props = {
  votes: ProposalVotes;
};

export default function Participants({ votes }: Props) {
  return (
    <Card
      // Was originally z-49
      className="bottom-0 z-40 flex w-full grow flex-col gap-6"
    >
      <Card.Header className="text-center text-[32px]/none font-medium">
        Participants
      </Card.Header>
      <TabList tabs={["For", "Against", "Abstain"]}>
        <VotesList voteType="for" votes={votes} />
        <VotesList voteType="against" votes={votes} />
        <VotesList voteType="abstain" votes={votes} />
      </TabList>
    </Card>
  );
}
