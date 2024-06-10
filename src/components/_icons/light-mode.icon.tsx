import BaseIconProps from "@/interfaces/base-icon-props.interface";
import exports from "@/styles/exports.module.scss";

export const LightModeIcon = ({
  width = 13,
  height = 13,
  color = exports.black,
}: BaseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
    >
      <g clipPath="url(#clip0_5629_3418)">
        <path
          d="M10.21 6.54232H10.6266M6.04329 2.37565V1.95898M6.04329 11.1257V10.709M9.37663 9.87565L8.95996 9.45898M9.37663 3.20898L8.95996 3.62565M2.70996 9.87565L3.12663 9.45898M2.70996 3.20898L3.12663 3.62565M1.45996 6.54232H1.87663M6.04329 9.04232C6.70633 9.04232 7.34222 8.77893 7.81106 8.31008C8.2799 7.84124 8.54329 7.20536 8.54329 6.54232C8.54329 5.87928 8.2799 5.24339 7.81106 4.77455C7.34222 4.30571 6.70633 4.04232 6.04329 4.04232C5.38025 4.04232 4.74437 4.30571 4.27553 4.77455C3.80669 5.24339 3.54329 5.87928 3.54329 6.54232C3.54329 7.20536 3.80669 7.84124 4.27553 8.31008C4.74437 8.77893 5.38025 9.04232 6.04329 9.04232Z"
          stroke={color}
          strokeWidth="1.33"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
