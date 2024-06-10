import BaseIconProps from "@/interfaces/base-icon-props.interface";

export const CeloLogoIcon = ({
  width = 23,
  height = 23,
  color = "#02010A",
  backgroundColor = "#FCFF52",
}: BaseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#da0yg)">
        <path
          fill={backgroundColor}
          d="M11.563 22.164c6.075 0 11-4.925 11-11s-4.925-11-11-11c-6.076 0-11 4.925-11 11s4.924 11 11 11Z"
        />
        <path
          fill={color}
          fillRule="evenodd"
          d="M17.716 4.97H5.408v12.388h12.309v-4.324h-2.043c-.704 1.578-2.289 2.676-4.102 2.676-2.5 0-4.525-2.056-4.525-4.554 0-2.499 2.025-4.537 4.525-4.537 1.849 0 3.434 1.134 4.138 2.746h2.007V4.971h-.001Z"
          clipRule="evenodd"
        />
      </g>
      <defs>
        <clipPath id="da0yg">
          <path fill="#fff" d="M.563.164h22v22h-22z" />
        </clipPath>
      </defs>
    </svg>
  );
};
