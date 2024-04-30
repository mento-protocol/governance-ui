import type { Participant } from "@/lib/graphql";
import { Avatar } from "@/components/_shared";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { formatUnits } from "viem";
import { WalletAddress } from "@/components/index";
import NumbersService from "@/lib/helpers/numbers.service";
import { ScrollArea } from "@/components/ui/scroll-area";

interface VotesListProps extends BaseComponentProps {
  participants: Participant[];
  voteTypeTotal: bigint;
  totalVotes: bigint;
}

export const VotesList = ({
  className,
  participants,
  voteTypeTotal,
  totalVotes,
}: VotesListProps) => {
  return (
    <div className={className}>
      <div className="flex flex-row items-center justify-between pb-4 text-lg">
        <div>{participants.length} Addresses</div>
        <div>
          {NumbersService.parseNumericValue(formatUnits(voteTypeTotal, 18), 2)}{" "}
          Votes
        </div>
      </div>
      <ScrollArea className="max-h-64">
        <section className="max-h-64">
          {participants.map((participant: Participant, index) => (
            <div
              key={index}
              className="flex flex-row items-center justify-between py-4 text-xl [&:not(:last-child)]:border-b [&:not(:last-child)]:border-solid [&:not(:last-child)]:border-gray-light"
            >
              <div className="flex flex-row items-center gap-x1">
                <Avatar
                  className="mr-2"
                  size="large"
                  address={participant.address}
                />
                <WalletAddress address={participant.address} />
              </div>
              <div className="flex flex-row items-center gap-x1">
                {getParticipantPercentage(participant, totalVotes)}
              </div>
            </div>
          ))}
        </section>
      </ScrollArea>
    </div>
  );
};

const getParticipantPercentage = (
  participant: Participant,
  totalVotes: bigint,
) => {
  // If there are no votes, we need to avoid division by zero
  if (totalVotes > BigInt(0)) {
    return `${Number((participant.weight / totalVotes) * BigInt(100)).toFixed(2)}%`;
  } else return "0%";
};
