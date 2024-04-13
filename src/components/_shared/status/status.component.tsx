import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";

interface StatusProps {
  text: string;
  className?: string;
}

const variants = cva(
  "flex h-[22px] w-min items-center justify-center whitespace-nowrap rounded-[4px] border  px-6 py-[6.5px] text-center font-fg text-[16px]/[1] font-medium uppercase",
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
        outline: "border-black bg-transparent dark:border-white",
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
      <span className="relative dark:text-black">{text}</span>
    </div>
  );
};
