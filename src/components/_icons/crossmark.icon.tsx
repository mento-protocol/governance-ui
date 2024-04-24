import BaseIconProps from "@/interfaces/base-icon-props.interface";

export const CrossMarkIcon = ({
  height = 17,
  width = 17,
  className,
}: BaseIconProps) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        className="fill-black stroke-black"
        x="1.10547"
        y="1.25977"
        width="15"
        height="15"
        rx="3.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7407 4.62446C12.9815 4.86525 12.9815 5.25564 12.7407 5.49643L5.34203 12.8951C5.10125 13.1359 4.71085 13.1359 4.47006 12.8951C4.22927 12.6543 4.22927 12.2639 4.47006 12.0231L11.8687 4.62446C12.1095 4.38367 12.4999 4.38367 12.7407 4.62446Z"
        className="stroke-white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7398 12.895C12.499 13.1358 12.1086 13.1358 11.8678 12.895L4.46919 5.49633C4.2284 5.25554 4.2284 4.86515 4.46919 4.62436C4.70997 4.38357 5.10037 4.38357 5.34116 4.62436L12.7398 12.023C12.9806 12.2638 12.9806 12.6542 12.7398 12.895Z"
        className="stroke-white"
      />
    </svg>
  );
};
