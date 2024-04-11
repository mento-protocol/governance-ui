import { Button } from "../_shared";
import { VOTE_TYPES } from "./cast-vote";

export const VotingButtons = ({
  onSubmit,
}: {
  onSubmit: (voteType: (typeof VOTE_TYPES)[keyof typeof VOTE_TYPES]) => void;
}) => {
  return (
    <div className="flex flex-col gap-x3">
      <Button
        theme="success"
        fullwidth
        onClick={() => onSubmit(VOTE_TYPES.For)}
      >
        For
      </Button>
      <Button
        type="submit"
        theme="danger"
        fullwidth
        onClick={() => onSubmit(VOTE_TYPES.Against)}
      >
        Against
      </Button>
      <Button
        type="submit"
        theme="white"
        fullwidth
        onClick={() => onSubmit(VOTE_TYPES.Abstain)}
      >
        Abstain
      </Button>
    </div>
  );
};
