import { BadgeType } from "@/lib/types";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";

interface StatusProps {
  text: string;
  type: BadgeType;
  className?: string;
}

const variants = cva(
  "border border-solid color-black flex h-[22px] w-min min-w-full items-center justify-center whitespace-nowrap rounded-lg pt-[6px] text-center font-fg text-[16px]/[1] font-medium py-[6.5px] uppercase not-italic",
  {
    variants: {
      type: {
        primary: "border-primary bg-primary",
        secondary: "border-secondary bg-secondary",
        tertiary: "",
        success: "border-success bg-success",
        danger: "border-error bg-error",
        warning: "border-warning bg-warning",
        info: "border-info bg-info",
      },
    },
    defaultVariants: {
      type: "primary",
    },
  },
);

export const Status = ({
  text,
  type,
  className,
}: StatusProps & VariantProps<typeof variants>) => {
  return (
    <div className={cn(variants({ type }), className)}>
      <span className="relative bottom-[-2px] dark:text-black">{text}</span>
    </div>
  );
};
