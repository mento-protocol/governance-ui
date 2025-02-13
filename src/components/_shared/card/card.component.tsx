import { ReactNode } from "react";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@mento-protocol/ui-toolkit";

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
      className={cn("rounded-lg rounded-r-lg bg-[inherit]", className)}
    >
      {children}
    </header>
  );
};

const CardFooter = ({ children, className, style }: CardPartialProps) => {
  return (
    <footer className={className} style={style}>
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
      className={cn(
        `rounded-lg border border-gray-light bg-white p-5 dark:bg-black-off`,
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
