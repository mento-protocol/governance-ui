import React, { HTMLProps } from "react";

interface SpacerProps extends HTMLProps<HTMLDivElement> {
  axis?: "horizontal" | "vertical";
}

const Spacer: React.FC<SpacerProps> = ({ axis = "horizontal", className }) => {
  // Define base classes
  let classes = axis === "horizontal" ? "w-1" : "h-1";

  return <span className={`${classes} ${className}`} />;
};

export default Spacer;
