import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";

interface TabProps extends BaseComponentProps {}

export const Tab = ({ className, style, children }: TabProps) => {
  return (
    <div className={classNames(className)} style={style}>
      {children}
    </div>
  );
};