import classNames from "classnames";
import { MentoIcon } from "@/components/_icons";
import styles from "./loader.module.scss";
import { IMentoIcon } from "@/components/_icons/mento.icon";

interface ILoader extends IMentoIcon {
  isCenter?: boolean;
}

export const Loader = ({ isCenter, backgroundColor }: ILoader) => {
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
