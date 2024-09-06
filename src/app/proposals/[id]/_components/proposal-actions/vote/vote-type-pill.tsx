import { REVERSE_VOTE_TYPE_MAP, VOTE_TYPES } from "./vote.component";
import { cn } from "@/styles/helpers";

export const VoteTypePill = ({ voteType }: { voteType: number }) => {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-md border-[0.5px] border-black px-2 py-1 text-sm text-black",
        { "bg-light-green": voteType === VOTE_TYPES.For },
        { "bg-light-red": voteType === VOTE_TYPES.Against },
        { "bg-white": voteType === VOTE_TYPES.Abstain },
      )}
    >
      {`${REVERSE_VOTE_TYPE_MAP[voteType]}`}
    </span>
  );
};
