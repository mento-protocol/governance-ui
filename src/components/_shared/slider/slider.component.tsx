"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/styles/helpers";

type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  labels?: {
    min?: string;
    max?: string;
    current?: React.ReactNode;
  };
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, labels, ...props }: SliderProps, ref) => {
  return (
    <div className="mt-10 flex flex-col gap-1">
      <div className="flex justify-between text-gray-dark">
        <label className="-translate-x-5" key={labels?.min}>
          {labels?.min}
        </label>
        <label className="translate-x-5" key={labels?.max}>
          {labels?.max}
        </label>
      </div>
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className,
        )}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-[34px] w-full grow overflow-hidden rounded-lg border border-black dark:border-gray-light ">
          <SliderPrimitive.Range className="absolute h-full bg-mento-blush" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="focus-visible:ring-ring relative block h-11 w-11 rounded-lg border border-black bg-black shadow transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-light">
          {props.min &&
          props.max &&
          props.value &&
          props?.value?.[0] > props?.min &&
          props?.value?.[0] < props?.max ? (
            <span className="absolute -top-12 left-1/2 flex -translate-x-1/2 text-gray-dark">
              <div className="flex w-fit whitespace-nowrap">
                {labels?.current}
              </div>
            </span>
          ) : null}
        </SliderPrimitive.Thumb>
      </SliderPrimitive.Root>
    </div>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
