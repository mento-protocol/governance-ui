import React from "react";
import { Card } from "@/components/_shared";

export const ProposalActionTitle = ({
  children = "Cast Votes",
}: React.PropsWithChildren) => {
  return (
    <Card.Header className="text-center">
      <h2 className="font-fg text-[32px]/none font-medium">{children}</h2>
    </Card.Header>
  );
};
