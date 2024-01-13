import classNames from "classnames";
import styles from "./badge.module.scss";
import BaseComponentProps from "@interfaces/base-component-props.interface";
import { BadgeType } from "@/app/types";
import { ReactNode } from "react";
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
