import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@/styles/helpers";

export const Divider = ({ className }: BaseComponentProps) => {
  return <div className={cn("border-b border-gray-light", className)} />;
};
