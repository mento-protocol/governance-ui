import BaseIconProps from "@/interfaces/base-icon-props.interface";
import classNames from "classnames";

interface MenuIconProps extends BaseIconProps {
  opened: boolean;
}

export const MenuIcon = ({
  width = 20,
  height = 14,
  opened,
}: MenuIconProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={classNames("hamburger", opened && "opened")}
    >
      <span />
      <span />
      <span />
    </div>
  );
};
