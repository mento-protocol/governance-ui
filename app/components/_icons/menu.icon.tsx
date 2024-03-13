import BaseIconProps from "@interfaces/base-icon-props.interface";

interface MenuIconProps extends BaseIconProps {}

export const MenuIcon = ({
  width = 25,
  height = 25,
  color,
  className,
  style,
}: MenuIconProps) => {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.77344 5H22.7734M2.77344 12H22.7734M2.77344 19H22.7734"
        stroke={color || "currentColor"}
        strokeWidth="1.5"
      />
    </svg>
  );
};
