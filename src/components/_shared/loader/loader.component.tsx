import { IMentoIcon, MentoIcon } from "@/components/_icons";
import { cn } from "@/styles/helpers";

interface ILoader extends IMentoIcon {
  className?: string;
  isCenter?: boolean;
  logoColor?: string;
  borderColor?: string;
}

export const Loader = ({
  className,
  isCenter,
  backgroundColor = "default",
  borderColor,
  logoColor = "mento-dark",
}: ILoader) => {
  borderColor =
    borderColor ||
    `before:border-${logoColor || "primary"} dark:before:border-white`;
  return (
    <div
      className={cn(
        "w-max",
        isCenter && "m-auto flex justify-center",
        className,
      )}
    >
      <div className="relative h-x12 w-x12">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <MentoIcon
            logoColor={`${logoColor} dark:fill-white`}
            backgroundColor={backgroundColor}
          />
        </div>
        <div
          className={cn(
            "relative h-x12 w-x12 animate-altSpin rounded-[50%] [animation-fill-mode:forwards]",
            `${borderColor} before:absolute before:inset-0 before:animate-loaderPulseBorder before:rounded-[50%] before:border-[2px]`,
          )}
        />
      </div>
    </div>
  );
};
