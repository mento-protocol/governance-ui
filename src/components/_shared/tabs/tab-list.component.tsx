"use strict";
import { Children, ComponentProps, useState } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@mento-protocol/ui-toolkit";

const variants = cva("sticky top-0 z-10 flex bg-inherit px-0 py-x1", {
  variants: {
    headerAlignment: {
      default: "justify-between",
      left: "justify-start",
      right: "justify-end",
    },
  },
  defaultVariants: {
    headerAlignment: "default",
  },
});

const buttonVariant = cva(
  "m-0 cursor-pointer border-none bg-none p-0 text-lg text-gray-light hover:text-primary",
  {
    variants: {
      selected: {
        true: "font-medium text-primary",
        false: "",
      },
    },
    defaultVariants: {
      selected: false,
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
    <div className={cn("flex flex-col gap-6 bg-inherit", className)}>
      <div
        className={variants({
          headerAlignment,
        })}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={buttonVariant({
              selected: index === selectedTab,
            })}
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
