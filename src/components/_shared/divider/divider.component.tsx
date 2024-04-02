import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";

export const Divider = ({ className }: BaseComponentProps) => {
  return (
    <div className={classNames("border-b border-gray-light", className)} />
  );
};
