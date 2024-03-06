import { MentoIcon } from "@components/_icons";
import styles from "./loader.module.scss";
import exports from "@styles/exports.module.scss";
import classNames from "classnames";

export const Loader = ({
  isCenter,
  backgroundColor = exports.info,
}: {
  isCenter?: boolean;
  backgroundColor?: string;
}) => {
  return (
    <div className={classNames(isCenter && "flex justify-center")}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <MentoIcon backgroundColor={backgroundColor} />
        </div>
        <div className={styles.loader} />
      </div>
    </div>
  );
};
