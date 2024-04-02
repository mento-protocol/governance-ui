import { ReactNode } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
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
      className={classNames("rounded-lg rounded-r-lg bg-[inherit]", className)}
    >
      {children}
    </header>
  );
};

const CardFooter = ({ children, className, style }: CardPartialProps) => {
  return (
    <footer className={classNames(className)} style={style}>
      {children}
    </footer>
  );
};

export const Card = ({
  children,
  className,
  block,
  transparent,
}: CardProps) => {
  return (
    <div
      className={classNames(
        `rounded-lg border border-gray-light bg-white p-5 dark:bg-off-black`,
        block && "w-full",
        transparent && "bg-transparent",
        className,
      )}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
