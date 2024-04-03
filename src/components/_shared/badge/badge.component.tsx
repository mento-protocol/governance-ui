import React from "react";
import { cn } from "@/styles/helpers";
import { VariantProps, cva } from "class-variance-authority";

const variants = cva(
  "flex min-h-[36px] min-w-[70px] items-center justify-center whitespace-nowrap rounded-[40px] p-2.5 font-inter text-base/4 md:text-lg/[18px]",
  {
    variants: {
      type: {
        default: "bg-primary",
        outline: "border border-black dark:border-white",
        secondary: "bg-secondary dark:text-black",
      },
      fullwidth: { true: "w-full" },
    },
    defaultVariants: {
      type: "default",
      fullwidth: false,
    },
  },
);

export const Badge = ({
  children,
  type = "default",
  fullwidth = false,
  className,
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof variants>) => {
  return (
    <div className={cn(variants({ type, fullwidth, className }))}>
      {children}
    </div>
  );
};
