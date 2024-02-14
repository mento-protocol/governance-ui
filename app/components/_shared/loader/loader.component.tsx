import { MentoIcon } from "@components/_icons";
import styles from "./loader.module.scss";
import exports from "@styles/exports.module.scss";
import classNames from "classnames";
import { CSSProperties } from "react";

interface LoaderProps {
  isCenter?: boolean;
  empty?: boolean;
  size?: number;
}

export const Loader = ({ isCenter, empty, size }: LoaderProps) => {
  const style: CSSProperties = !!size
    ? {
        width: size,
        height: size,
      }
    : {};
  return (
    <div className={classNames(isCenter && "flex justify-center")}>
      <div className={styles.container} style={style}>
        <div className={styles.icon}>
          {!empty && <MentoIcon backgroundColor={exports.info} />}
        </div>
        <div className={styles.loader} style={style} />
      </div>
    </div>
  );
};
