import { SVGProps } from "react";

export const SuccessIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" {...props}>
    <circle cx="26" cy="26" r="25" className="fill-success" />
    <path
      className="stroke-[black]"
      d="M14.1 27.2l7.1 7.2 16.7-16.8"
      fill="none"
      strokeWidth="2"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    />
  </svg>
);
