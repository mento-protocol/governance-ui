import BaseComponentProps from "@/interfaces/base-component-props.interface";
import { cn } from "@mento-protocol/ui-toolkit";

export const Dropdown = ({
  children,
  className,
  style,
}: BaseComponentProps) => {
  return (
    <div className={cn("w-full rounded-lg", className)} style={style}>
      {children}
    </div>
  );
};

interface ElementProps extends BaseComponentProps {
  onClick?: () => void;
}

export const DropdownElement = ({
  children,
  className,
  style,
  onClick,
}: ElementProps) => {
  return (
    <div
      className={cn("dropdown_element group last:border-b-0", className)}
      style={style}
    >
      <button
        className={cn(
          "w-full whitespace-nowrap border-none bg-transparent px-5 py-3",
          "text-left",
          "group-first:rounded-t-lg group-last:rounded-b-lg group-hover:text-gray-alt66",
        )}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};
