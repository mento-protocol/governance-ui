export const ChainIcon = ({
  size = 32,
  strokeClass = "stroke-mento-dark dark:stroke-white",
  className,
}: {
  size?: number;
  strokeClass?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      height={size}
      width={size}
      // viewBox="0 0 24 24"  Originally 24 so had to adjust size & origin
      viewBox="-4 -4 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.5442 10.4558C11.8385 8.75022 9.07316 8.75022 7.36753 10.4558L4.27922 13.5442C2.57359 15.2498 2.57359 18.0152 4.27922 19.7208C5.98485 21.4264 8.75021 21.4264 10.4558 19.7208L12 18.1766"
        className={strokeClass}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.4558 13.5442C12.1614 15.2498 14.9268 15.2498 16.6324 13.5442L19.7207 10.4558C21.4264 8.75021 21.4264 5.98485 19.7207 4.27922C18.0151 2.57359 15.2497 2.57359 13.5441 4.27922L12 5.82338"
        className={strokeClass}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
