import { SVGProps } from "react";

export const RightChevron = (props: SVGProps<SVGSVGElement>) => (
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
      d="m8 5.5 4 4.5-4 4.5"
    />
  </svg>
);
