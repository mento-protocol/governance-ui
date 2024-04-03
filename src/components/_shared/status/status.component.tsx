import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";

interface StatusProps {
  text: string;
  className?: string;
}

const variants = cva(
  "color-black flex h-[22px] w-min min-w-full items-center justify-center whitespace-nowrap rounded-lg border border-solid py-[6.5px] pt-[6px] text-center font-fg text-[16px]/[1] font-medium uppercase not-italic",
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
