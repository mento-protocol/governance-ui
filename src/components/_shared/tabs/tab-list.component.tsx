"use strict";
import { Children, ComponentProps, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";

const variants = cva(
  "sticky top-0 z-10 flex flex-row gap-x2 bg-inherit px-0 py-x1",
  {
    variants: {
      headerAlignment: {
        default: "",
        left: "justify-start",
        right: "justify-end",
      },
    },
    defaultVariants: {
      headerAlignment: "default",
    },
  },
);

export interface TabListProps
  extends ComponentProps<"div">,
    VariantProps<typeof variants> {
  tabs: string[];
}

export const TabList = ({
  className,
  children,
  tabs,
  headerAlignment = "default",
}: TabListProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={cn("bg-inherit", className)}>
      <div
        className={variants({
          headerAlignment,
        })}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={cn(
              "m-0 cursor-pointer border-none bg-none p-0 hover:text-primary",
              index === selectedTab && "text-primary",
            )}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex max-h-[500px] flex-nowrap overflow-hidden overflow-y-auto md:max-h-full md:overflow-y-visible">
        {Children.toArray(children).map((child, index) => (
          <div
            key={index}
            className={cn(
              "w-full min-w-full max-w-full break-all duration-300 ease-out-back",
              index !== selectedTab &&
                "max-h-[100px] overflow-hidden opacity-0",
            )}
            style={{ transform: `translate(-${selectedTab * 100}%)` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
