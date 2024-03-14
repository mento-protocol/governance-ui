import { ReactNode } from "react";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import styles from "./card.module.scss";

interface CardPartialProps extends BaseComponentProps {
  children: ReactNode;
}

interface CardProps extends CardPartialProps {
  block?: boolean;
  transparent?: boolean;
}

const CardHeader = ({ children, className, style }: CardPartialProps) => {
  return (
    <header
      className={classNames(styles.card__header, className)}
      style={style}
    >
      {children}
    </header>
  );
};

const CardFooter = ({ children, className, style }: CardPartialProps) => {
  return (
    <footer
      className={classNames(styles.card__footer, className)}
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
  transparent,
}: CardProps) => {
  return (
    <div
      className={classNames(
        styles.card,
        block && styles.block,
        transparent && styles.transparent,
        className,
        "rounded-lg",
      )}
      style={style}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Footer = CardFooter;
