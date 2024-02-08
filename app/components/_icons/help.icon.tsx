import BaseIconProps from "@interfaces/base-icon-props.interface";
import exports from "@styles/exports.module.scss";

export const HelpIcon = ({
  width = 24,
  height = 24,
  color = exports.primary,
}: BaseIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20ZM11 17H13V15H11V17ZM11 13H13V7H11V13Z"
        fill={color}
      />
    </svg>
  );
};
