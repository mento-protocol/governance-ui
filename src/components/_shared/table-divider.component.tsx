import { cn } from "@/styles/helpers";
import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";

interface TableDividerProps extends BaseComponentProps {
  fullWidth?: boolean;
}

export const TableDivider = ({
  className,
  fullWidth = true,
}: TableDividerProps) => (
  <div
    className={cn(
      "border-b border-solid border-gray-light",
      fullWidth && "[grid-column:1_/_-1]",
      className,
    )}
  />
);
