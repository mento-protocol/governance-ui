import { Button } from "../_shared";
import { VOTE_TYPES } from "./cast-vote";

const VotingButtons = ({
  onSubmit,
}: {
  onSubmit: (voteType: (typeof VOTE_TYPES)[keyof typeof VOTE_TYPES]) => void;
}) => {
  return (
    <div className="gap-x3 flex flex-col">
      <Button theme="success" block onClick={() => onSubmit(VOTE_TYPES.For)}>
        For
      </Button>
      <Button
        type="submit"
        theme="danger"
        block
        onClick={() => onSubmit(VOTE_TYPES.Against)}
      >
        Against
      </Button>
      <Button
        type="submit"
        theme="tertiary"
        block
        onClick={() => onSubmit(VOTE_TYPES.Abstain)}
      >
        Abstain
      </Button>
    </div>
  );
};

export default VotingButtons;
