import { ReactNode, useMemo } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { BadgeType } from "@/lib/types";

interface BadgeProps extends BaseComponentProps {
  children: ReactNode;
  type: BadgeType;
  rounded?: boolean;
  block?: boolean;
}

export const Badge = ({
  children,
  type,
  block = false,
  rounded = false,
  className,
  style,
}: BadgeProps) => {
  const brandedStyles = useMemo(() => {
    switch (type) {
      case "secondary":
        // border: 1px solid $c-secondary;
        // background-color: $c-secondary;
        // color: $c-black);
        return ""; // TODO
      case "tertiary":
        // border: 1px solid var(--theme-foreground-color);
        // background-color: transparent;
        // color:var(--theme-foreground-color);
        // border: 1px solid var(--theme-foreground-color);
        return ""; // TODO
      default:
        return "";
    }
  }, [type]);

  const roundedStyles = useMemo(() => {
    return rounded ? "px-2 py-2.5 rounded-bl-3xl" : "py-1.5 px-2.5";
  }, [rounded]);

  return (
    <div
      className={
        // TODO: border radius was set to 40, 5 * border radius var (8px)
        // TODO: font size 16 with 1em height
        `${brandedStyles} ${roundedStyles} rounded-lg text-base items-center text-center w-min whitespace-nowrap flex min-w-[70px] min-h-[50px] md:text-lg ${block && "w-full"} ${className}`
      }
    >
      {children}
    </div>
  );
};
