import { MentoIcon } from "@components/_icons";
import styles from "./loader.module.scss";
import classNames from "classnames";
import { CSSProperties } from "react";

interface LoaderProps {
  isCenter?: boolean;
  empty?: boolean;
  backgroundColor?: string;
  size?: number;
}

export const Loader = ({
  isCenter,
  empty,
  size,
  backgroundColor,
}: LoaderProps) => {
  const style: CSSProperties = !!size
    ? {
        width: size,
        height: size,
      }
    : {};
  return (
    <div className={classNames(isCenter && "flex justify-center")}>
      <div className={styles.container} style={style}>
        {!empty && (
          <div className={styles.icon}>
            <MentoIcon backgroundColor={backgroundColor} />
          </div>
        )}
        <div className={styles.loader} style={style} />
      </div>
    </div>
  );
};
