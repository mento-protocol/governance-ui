import classNames from "classnames";
import BaseComponentProps from "@/interfaces/base-component-props.interface";
import styles from "./dropdown-button.module.scss";

export const Dropdown = ({
  children,
  className,
  style,
}: BaseComponentProps) => {
  return (
    <div className={classNames(styles.dropdown, className)} style={style}>
      {children}
    </div>
  );
};

interface ElementProps extends BaseComponentProps {
  onClick?: () => void;
}

export const DropdownElement = ({
  children,
  className,
  style,
  onClick,
}: ElementProps) => {
  return (
    <div
      className={classNames(styles.dropdown_element, className)}
      style={style}
    >
      {/* TODO: no idea where this color came from hover:bg-[#88888866] */}
      <button
        className="w-full whitespace-nowrap border-none bg-transparent p-x2"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
