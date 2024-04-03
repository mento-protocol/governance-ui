import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";
import { ComponentProps } from "react";

const variants = cva(
  "relative w-full rounded-lg border border-solid border-black font-inter text-black transition",
  {
    variants: {
      disabled: { true: "group/button-disabled w-full cursor-not-allowed" },
      fullwidth: { true: "", false: "max-w-[200px]" },
      theme: {
        primary:
          "ease-out-back text-white after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-primary-dark hover:top-[8px] active:top-[2px] [&_path]:fill-white",
        secondary:
          "ease-out-back text-black after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-secondary-dark hover:top-[8px] active:top-[2px] [&_path]:fill-black",
        tertiary:
          "ease-out-back text-black after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-gray hover:top-[8px] active:top-[2px] [&_path]:fill-black",
        danger:
          "ease-out-back text-black after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-error-dark hover:top-[8px] active:top-[2px] [&_path]:fill-black",
        warning:
          "ease-out-back text-black after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-warning-dark hover:top-[8px] active:top-[2px] [&_path]:fill-black",
        success:
          "ease-out-back text-black after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:rounded-b-lg after:bg-success-dark active:top-[2px] [&_path]:fill-black",
        info: "rounded-b-lg after:relative after:-bottom-[4px] after:h-[4px] after:w-full after:bg-info-dark",
        link: "color border-none border-b-transparent text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white",
        clear:
          "border-b-transparent transition-[background-color] duration-200 ease-out hover:bg-gray-lighter dark:hover:bg-gray",
      },
    },
    defaultVariants: {
      disabled: false,
      fullwidth: false,
      theme: "primary",
    },
  },
);

export type ButtonProps = ComponentProps<"button"> &
  ComponentProps<"a"> &
  VariantProps<typeof variants>;

export const Button = ({
  children,
  theme = "primary",
  onClick,
  className,
  type = "button",
  href,
  target = "_self",
  fullwidth,
  disabled,
}: ButtonProps) => {
  return (
    <>
      {href ? (
        <Link
          href={href}
          target={target}
          className={cn(
            className,
            variants({
              fullwidth,
              disabled,
              theme,
            }),
          )}
        >
          {/* Transition east out 0.2 */}
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap px-x4 py-x2 text-sm font-medium tracking-normal [&_*]:whitespace-nowrap">
            {children}
          </span>
        </Link>
      ) : (
        <button
          type={type}
          className={cn(
            className,
            variants({
              fullwidth,
              disabled,
              theme,
            }),
          )}
          onClick={onClick}
        >
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap px-x4 py-x2 text-sm font-medium tracking-normal [&_*]:whitespace-nowrap">
            {children}
          </span>
        </button>
      )}
    </>
  );
};
