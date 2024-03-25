import classNames from "classnames";
import styles from "./status.module.scss";
import { BadgeType } from "@/lib/types";

interface StatusProps {
  text: string;
  type: BadgeType;
}

export const Status = ({ text, type }: StatusProps) => {
  return <div className={classNames(styles.badge, styles[type])}>{text}</div>;
};
