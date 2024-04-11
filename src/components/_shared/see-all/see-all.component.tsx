import { ReactNode, useMemo, useRef } from "react";
import { cn } from "@/styles/helpers";

interface SeeAllProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children: ReactNode;
  height: number;
}

export const SeeAll = ({
  isOpen,
  setIsOpen,
  children,
  height,
}: SeeAllProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const initialHeight = useMemo(() => {
    const sizeData = ref.current?.getBoundingClientRect();
    return sizeData?.height;
    // Less exhaustive than wiring in resize effects
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  const enabled = useMemo(() => {
    return initialHeight && initialHeight > height;
  }, [height, initialHeight]);

  const currentHeight = useMemo(() => {
    if (isOpen) {
      return `${initialHeight}px`;
    } else {
      return `${height}px`;
    }
  }, [height, initialHeight, isOpen]);

  return (
    <div
      ref={ref}
      className={cn(
        "group/see-all duration relative h-full overflow-hidden transition-all",
        !enabled ? "disabled" : "pb-x5 *:h-max",
        isOpen && "open",
      )}
      style={{
        maxHeight: enabled ? currentHeight : "max-content",
      }}
    >
      {children}
      <button
        className={cn(
          "absolute bottom-0 left-0 !h-[40%] w-full text-primary transition-all duration-100",
          "bg-gradient-to-t from-white to-transparent dark:from-black-off",
          "group-[.open]/see-all:!h-x6 group-[.open]/see-all:bg-none",
          "group-[.disabled]/see-all:invisible group-[.disabled]/see-all:opacity-0",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Hide" : "Show more"}
      </button>
    </div>
  );
};
