import { ReactNode, useMemo } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { prefixStyles } from "@/styles/helpers";
import classNames from "classnames";

interface CardPartialProps extends BaseComponentProps {
  children: ReactNode;
}

interface CardProps extends CardPartialProps {
  block?: boolean;
  transparent?: boolean;
  noBorderMobile?: boolean;
}

// TODO: sibling selectors, immediate child selectors, grouping

const CardHeader = ({ children, className }: CardPartialProps) => {
  return (
    <header
      // TODO: padding was 10, now 12
      className={`${prefixStyles("relative rounded-t-lg rounded-r-lg bg-[inherit] p-3 md:p-5 md:pb-3", "group/no-mobile")} ${className}`}
    >
      {children}
    </header>
  );
};

const CardFooter = ({ children, className, style }: CardPartialProps) => {
  return (
    <footer
      className={classNames("styles.card__footer", className)}
      style={style}
    >
      {children}
    </footer>
  );
};

export const Card = ({
  children,
  className,
  block,
  style,
  noBorderMobile,
  transparent,
}: CardProps) => {
  const noBorderMobileStyling = useMemo(() => {
    return noBorderMobile ? "group/no-mobile border-none" : "";
  }, [noBorderMobile]);
  return (
    <div
      // TODO: Fix classes
      // background-color: var(--theme-card-background);
      // Border color --theme-card
      className={`rounded-lg border-l border-r border-t border-b border-solid border  ${noBorderMobileStyling} ${block && "w-full"} ${transparent && "bg-transparent"} ${className}`}
      style={style}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
