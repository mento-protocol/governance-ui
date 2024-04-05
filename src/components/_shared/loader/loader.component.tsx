import classNames from "classnames";
import { IMentoIcon, MentoIcon } from "@/components/_icons";
import styles from "./loader.module.scss";

interface ILoader extends IMentoIcon {
  isCenter?: boolean;
  className?: string;
}

export const Loader = ({ className, isCenter, backgroundColor }: ILoader) => {
  return (
    <div className={classNames(className, isCenter && "flex justify-center")}>
      <div className={styles.container}>
        <div className={styles.icon}>
          <MentoIcon backgroundColor={backgroundColor} />
        </div>
        <div className={styles.loader} />
      </div>
    </div>
  );
};
