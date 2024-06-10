import { useLayoutEffect, useState } from "react";

export const useIsOverflow = (
  ref: React.MutableRefObject<HTMLElement>,
  callback: Function,
) => {
  const [isOverflow, setIsOverflow] = useState(false);
  useLayoutEffect(() => {
    const { current } = ref;

    const trigger = () => {
      const hasOverflow = current.scrollHeight > current.clientHeight;

      setIsOverflow(hasOverflow);

      if (callback) callback(hasOverflow);
    };

    if (current) {
      trigger();
    }
  }, [callback, ref]);

  return isOverflow;
};
