import React from "react";
import { CardHeader } from "@mento-protocol/ui-toolkit";

export const ProposalActionTitle = ({
  children = "Cast Votes",
}: React.PropsWithChildren) => {
  return (
    <CardHeader className="text-center">
      <h2 className="font-fg text-[32px]/none font-medium">{children}</h2>
    </CardHeader>
  );
};
