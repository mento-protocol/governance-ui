import { SVGProps } from "react";

interface DisconnectIconProps extends SVGProps<SVGSVGElement> {
  size?: number;
  strokeClass?: string;
}

export const DisconnectIcon = ({
  className,
  size,
  strokeClass,
}: DisconnectIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={size || 32}
      height={size || 32}
      viewBox="0 0 33 32"
      fill="none"
    >
      <path
        d="M16.9844 16.0098H23.9844M23.9844 16.0098L20.9844 19.0098M23.9844 16.0098L20.9844 13.0098M23.9844 10.0098V9.00977C23.9844 8.47933 23.7737 7.97062 23.3986 7.59555C23.0235 7.22048 22.5148 7.00977 21.9844 7.00977H11.9844C11.4539 7.00977 10.9452 7.22048 10.5702 7.59555C10.1951 7.97062 9.98438 8.47933 9.98438 9.00977V23.0098C9.98438 23.5402 10.1951 24.0489 10.5702 24.424C10.9452 24.7991 11.4539 25.0098 11.9844 25.0098H21.9844C22.5148 25.0098 23.0235 24.7991 23.3986 24.424C23.7737 24.0489 23.9844 23.5402 23.9844 23.0098V22.0098"
        className={strokeClass || "stroke-mento-dark dark:stroke-white"}
        strokeWidth="1.33"
        strokeLinecap="square"
      />
    </svg>
  );
};
