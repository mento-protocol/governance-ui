import classNames from "classnames";
import { MentoIcon } from "@/components/_icons";
import styles from "./loader.module.scss";

export const Loader = ({
  isCenter,
  backgroundColor = "none",
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
