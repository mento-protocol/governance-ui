import { cn } from "@/styles/helpers";
import React from "react";

const ValueLoaderSkeleton = ({
  children,
  className,
}: React.HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={cn(
        "text-[22px]",
        className,
        "animate-pulse rounded-[4px] bg-gray-300",
      )}
    >
      <span className="opacity-0">{children}</span>
    </div>
  );
};

export default ValueLoaderSkeleton;
