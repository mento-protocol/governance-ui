import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";
import { ComponentProps } from "react";

// TODO: group style types in cn combiner for readability
const variants = cva(
  "relative block w-full select-none rounded-md border border-solid border-black px-x4 py-x2 font-inter text-sm text-black transition [transform-style:preserve-3d] hover:no-underline disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-gray-light disabled:text-black disabled:before:bg-black-off hover:[&>span]:text-[inherit]",
  {
    variants: {
      fullwidth: { true: "", false: "max-w-[200px]" },
      theme: {
        primary: cn(
          "text-white hover:text-white",
          "bg-primary [&_path]:fill-white",
          "top-[-3px] before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] hover:top-0 active:top-[1px]",
          "transition-all duration-200 ease-out-back ",
          "before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-primary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:before:top-[calc(50%_+_1px)] active:before:top-[calc(50%_+_2px)]",
        ),
        secondary: cn(
          "top-[-3px] bg-secondary text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-secondary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        ),
        tertiary: cn(
          "bg-danger top-[-3px] top-[-3px] text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-primary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        ),
        danger: cn(
          "top-[-3px] bg-error text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-error-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black",
        ),
        warning: cn(
          "top-[-3px] bg-warning text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-warning-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        ),
        success: cn(
          "top-[-3px] bg-success text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-success-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        ),
        info: cn(
          "top-[-3px] rounded-b-lg bg-info transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-info-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black",
        ),
        white: cn(
          "top-[-3px] rounded-b-lg bg-white transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-gray-light before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black",
        ),
        link: cn(
          "color border-none text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white",
        ),
        clear: cn(
          "transition-[background-color] duration-200 ease-out hover:bg-gray-lighter hover:text-black dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-gray dark:hover:text-white",
        ),
      },
    },
    defaultVariants: {
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
            variants({
              fullwidth,
              theme,
              className,
            }),
          )}
        >
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap font-medium tracking-normal no-underline transition duration-200 ease-out [&_*]:whitespace-nowrap">
            {children}
          </span>
        </Link>
      ) : (
        <button
          disabled={disabled}
          type={type}
          className={cn(
            variants({
              fullwidth,
              theme,
              className,
            }),
          )}
          onClick={onClick}
        >
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap font-medium tracking-normal [&_*]:whitespace-nowrap">
            {children}
          </span>
        </button>
      )}
    </>
  );
};
