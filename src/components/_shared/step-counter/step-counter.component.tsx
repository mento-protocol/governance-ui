import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@/styles/helpers";

interface StepCounterProps extends BaseComponentProps {}

export const StepCounter = ({ children, className }: StepCounterProps) => {
  return (
    <div
      className={cn(
        "relative flex h-x5 w-x5 items-center justify-center rounded-t-[4px] bg-inherit",
        "before:absolute before:left-[-4px] before:top-[-4px] before:z-[1] before:h-[4px] before:w-[4px] before:bg-inherit",
        "after:absolute after:bottom-[-4px] after:right-[-4px] after:z-[1] after:h-[4px] after:w-[4px] after:bg-inherit",
        className,
      )}
    >
      {children}
    </div>
  );
};
