export const AccountIcon = ({
  width = 33,
  height = 32,
  strokeClass = "stroke-mento-dark dark:stroke-white",
  className,
}: {
  width?: number;
  height?: number;
  strokeClass?: string;
  className?: string;
}) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 33 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.9848 19.9716C20.8748 19.9716 24.0282 16.8181 24.0282 12.9282C24.0282 9.0382 20.8748 5.88477 16.9848 5.88477C13.0948 5.88477 9.94141 9.0382 9.94141 12.9282C9.94141 16.8181 13.0948 19.9716 16.9848 19.9716Z"
        className={strokeClass}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.30859 26.1347C7.39035 24.2606 8.94638 22.7044 10.8203 21.6224C12.6942 20.5403 14.8199 19.9707 16.9838 19.9707C19.1476 19.9707 21.2733 20.5403 23.1472 21.6224C25.0211 22.7044 26.5772 24.2606 27.6589 26.1347"
        className={strokeClass}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
