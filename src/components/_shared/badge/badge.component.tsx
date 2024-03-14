import { ReactNode } from "react";
import classNames from "classnames";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { BadgeType } from "@lib/types";
import styles from "./badge.module.scss";

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
  return (
    <div
      className={classNames(
        styles.badge,
        styles[type],
        block && styles.block,
        rounded && styles.rounded,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
};
