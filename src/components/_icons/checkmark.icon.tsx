import BaseIconProps from "@/interfaces/base-icon-props.interface";

export const CheckMarkIcon = ({
  height = 17,
  width = 17,
  className,
}: BaseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
    >
      <rect
        className="fill-primary stroke-black"
        x="1.10547"
        y="1.25977"
        width="15"
        height="15"
        rx="3.5"
      />
      <path
        d="M4.0332 8.18696L7.85644 11.6184L13.1761 5.90039"
        className="stroke-white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
