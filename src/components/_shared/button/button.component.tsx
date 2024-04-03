import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";
import { ComponentProps } from "react";

type ButtonProps = ComponentProps<"button"> & ComponentProps<"a">;

const variants = cva(
  "w-full rounded-lg border border-solid border-black font-inter text-black transition",
  {
    variants: {
      disabled: { true: "group/button-disabled w-full cursor-not-allowed" },
      fullwidth: { true: "", false: "max-w-[200px]" },
      theme: {
        primary: "",
        secondary: "",
        tertiary: "",
        danger: "",
        warning: "",
        success: "",
        info: "",
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
}: ButtonProps & VariantProps<typeof variants>) => {
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
