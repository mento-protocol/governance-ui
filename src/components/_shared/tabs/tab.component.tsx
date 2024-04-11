import BaseComponentProps from "@/interfaces/base-component-props.interface";

interface TabProps extends BaseComponentProps {}

export const Tab = ({ className, children }: TabProps) => {
  return <div className={className}>{children}</div>;
};
