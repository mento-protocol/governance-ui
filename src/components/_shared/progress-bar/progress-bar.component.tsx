import BaseComponentProps from "@/lib/interfaces/base-component-props.interface";

export interface IProgressBarItem {
  progress: number;
  barColor?: string;
}

export const ProgressBarItem = ({
  barColor = "mento-mint",
  progress,
}: IProgressBarItem) => {
  return (
    <div
      style={{
        width: `${Math.round(progress)}%`,
      }}
      className={`${barColor} shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center`}
    />
  );
};

interface IProgressBarProps extends BaseComponentProps {
  backgroundColor?: string;
}

export const ProgressBar = ({
  className,
  children,
  backgroundColor = "bg-transparent",
}: IProgressBarProps) => {
  return (
    <div className={`${className} relative`}>
      <div
        className={`${backgroundColor} overflow-hidden h-5 text-xs flex rounded-xl border-solid border`}
      >
        {children}
      </div>
    </div>
  );
};
