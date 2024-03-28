import classNames from "classnames";
import { REVERSE_VOTE_TYPE_MAP, VOTE_TYPES } from "./cast-vote";

const VoteTypePill = ({ voteType }: { voteType: number }) => {
  return (
    <span
      className={classNames(
        "inline-flex justify-center items-center text-black text-sm px-2 py-1 rounded-md border-[0.5px] border-black",
        { "bg-success": voteType === VOTE_TYPES.For },
        { "bg-error": voteType === VOTE_TYPES.Against },
        { "bg-white": voteType === VOTE_TYPES.Abstain },
      )}
    >
      {`${REVERSE_VOTE_TYPE_MAP[voteType]}`}
    </span>
  );
};

export default VoteTypePill;
