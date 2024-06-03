import { IMentoIcon, MentoIcon } from "@/components/_icons";
import { cn } from "@/styles/helpers";

interface ILoader extends IMentoIcon {
  isCenter?: boolean;
  className?: string;
  logoColor?: string;
}

export const Loader = ({
  className,
  isCenter,
  backgroundColor,
  logoColor,
}: ILoader) => {
  return (
    <div className={cn("w-max", isCenter && "flex justify-center", className)}>
      <div className="relative h-x12 w-x12">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
          <MentoIcon logoColor={logoColor} backgroundColor={backgroundColor} />
        </div>
        <div
          className={cn(
            "relative h-x12 w-x12 animate-altSpin rounded-[50%] [animation-fill-mode:forwards]",
            "before:absolute before:inset-0 before:animate-loaderPulseBorder before:rounded-[50%] before:border-[5px] before:border-primary",
          )}
        />
      </div>
    </div>
  );
};
