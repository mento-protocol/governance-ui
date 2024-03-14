import { ReactNode } from "react";
import classNames from "classnames";
import styles from "./see-all.module.scss";

interface SeeAllProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  height: string;
}

export const SeeAll = ({
  isOpen,
  setIsOpen,
  children,
  height,
}: SeeAllProps) => {
  return (
    <div className={styles.container}>
      <div
        style={{
          maxHeight: isOpen ? "max-content" : `${height}px`,
          height: isOpen ? "max-content" : "auto",
        }}
        className={classNames(styles.see_all, isOpen && styles.see_all__opened)}
      >
        {children}
        {!isOpen && (
          <div
            className={classNames(styles.shadow)}
            style={{ height: `${height}px` }}
          />
        )}
      </div>
      <div className={styles.button_wrapper}>
        {isOpen ? (
          <button onClick={() => setIsOpen(false)}>Hide</button>
        ) : (
          <button onClick={() => setIsOpen(true)}>See all</button>
        )}
      </div>
    </div>
  );
};
