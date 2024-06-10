import BaseIconProps from "@/interfaces/base-icon-props.interface";
import { cn } from "@/styles/helpers";

interface MenuIconProps extends BaseIconProps {
  opened: boolean;
}

export const MenuIcon = ({
  width = 20,
  height = 14,
  opened,
}: MenuIconProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className={cn(
        "group relative inline-block h-[24px] w-[24px] cursor-pointer",
        opened && "opened",
      )}
    >
      <span className="absolute top-0 h-[2px] w-full duration-300 group-[.opened]:top-[50%] group-[.opened]:translate-y-[-50%] group-[.opened]:rotate-45" />
      <span className="absolute top-[50%] h-[2px] w-full translate-y-[-50%] duration-300 group-[.opened]:opacity-0 " />
      <span className="absolute bottom-0 h-[2px] w-full duration-300 group-[.opened]:top-[50%] group-[.opened]:translate-y-[-50%]  group-[.opened]:-rotate-45" />
    </div>
  );
};
