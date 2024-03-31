import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";

export const Divider = ({ className }: BaseComponentProps) => {
  return (
    <hr
      className={classNames(
        "h-px border-0 bg-light-gray mt-4 mb-5 md:mt-5",
        className,
      )}
    />
  );
};
