import React from "react";
import { Card } from "@/components/_shared";

const VotingCardTitle = ({
  children = "Cast Votes",
}: React.PropsWithChildren) => {
  return (
    <Card.Header className="text-center">
      <h2 className="font-fg text-[2rem] font-medium leading-[2rem]">
        {children}
      </h2>
    </Card.Header>
  );
};

export default VotingCardTitle;
