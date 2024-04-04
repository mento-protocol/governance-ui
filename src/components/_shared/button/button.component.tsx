import Link from "next/link";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/styles/helpers";
import { ComponentProps } from "react";

const variants = cva(
  "relative mb-[8px] block w-full  rounded-md border border-solid border-black px-x4 py-x2 font-inter text-sm text-black transition [transform-style:preserve-3d] hover:no-underline hover:[&>span]:text-[inherit]",
  {
    variants: {
      disabled: { true: "group/button-disabled w-full cursor-not-allowed" },
      fullwidth: { true: "", false: "max-w-[200px]" },
      theme: {
        primary:
          "top-[-3px] bg-primary text-white transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-primary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-white hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-white",
        secondary:
          "top-[-3px] bg-secondary text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-secondary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        tertiary:
          "bg-danger top-[-3px] top-[-3px] text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-primary-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        danger:
          "top-[-3px] bg-error text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-error-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        warning:
          "top-[-3px] bg-warning text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-warning-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        success:
          "top-[-3px] bg-success text-black transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-success-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black ",
        info: "top-[-3px] rounded-b-lg bg-info transition-all duration-200 ease-out-back before:absolute before:left-[50%] before:top-[calc(50%_+_4px)] before:block before:h-[50%] before:w-[calc(100%_+_1.1px)] before:rounded-md before:border before:border-solid before:border-black before:bg-info-dark before:transition-all before:duration-200 before:ease-out-back before:[border-style:inset] before:[transform:translateX(-50%)_translateZ(-1px)] hover:top-0 hover:text-black hover:before:top-[calc(50%_+_1px)] active:top-[1px] active:top-[2px] active:before:top-[calc(50%_+_2px)] [&_path]:fill-black",
        link: "color border-none text-black underline transition-[color] duration-200 ease-out visited:text-primary-dark hover:text-primary active:text-primary-dark dark:text-white",
        clear:
          "transition-[background-color] duration-200 ease-out hover:bg-gray-lighter hover:text-black dark:border-white dark:bg-transparent dark:text-white dark:hover:bg-gray dark:hover:text-white",
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
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap font-medium tracking-normal no-underline [&_*]:whitespace-nowrap">
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
          <span className="flex items-center justify-center gap-[1ch] whitespace-nowrap font-medium tracking-normal [&_*]:whitespace-nowrap">
            {children}
          </span>
        </button>
      )}
    </>
  );
};
