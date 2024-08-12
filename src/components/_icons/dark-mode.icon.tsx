import BaseIconProps from "@/interfaces/base-icon-props.interface";

export const DarkModeIcon = ({
  width = 13,
  height = 13,
  color = "stroke-black",
}: BaseIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 13 13"
      fill="none"
    >
      <path
        d="M1.81641 5.94881C1.81571 7.01988 2.17729 8.05969 2.84237 8.89924C3.50745 9.7388 4.43693 10.3287 5.47974 10.5731C6.52254 10.8176 7.61736 10.7021 8.58623 10.2455C9.55511 9.78897 10.3411 9.01813 10.8164 8.05831C6.56291 8.05831 4.45341 5.94831 4.45341 1.69531C3.66133 2.08835 2.99476 2.6948 2.52885 3.44633C2.06293 4.19786 1.81618 5.06458 1.81641 5.94881Z"
        className={color}
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
