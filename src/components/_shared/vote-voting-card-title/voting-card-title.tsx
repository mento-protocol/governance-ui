import React from "react";
import { Card } from "@components/_shared";

const VotingCardTitle = ({
  children = "Cast Votes",
}: React.PropsWithChildren) => {
  return (
    <Card.Header className="text-center">
      <h2 className="text-[2rem] leading-[2rem] font-fg font-medium">
        {children}
      </h2>
    </Card.Header>
  );
};

export default VotingCardTitle;
