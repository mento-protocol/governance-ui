import { SVGProps } from "react";

export const DownChevron = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth={1.33}
        d="M14.5 8 10 12 5.5 8"
      />
    </svg>
  );
};
