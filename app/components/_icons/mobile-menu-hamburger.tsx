import { SVGProps } from "react";

export const MobileMenuHamburger = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 16"
    fill="none"
    {...props}
  >
    <path stroke="currentColor" strokeWidth={1.5} d="M0 1h20M0 8h20M0 15h20" />
  </svg>
);
