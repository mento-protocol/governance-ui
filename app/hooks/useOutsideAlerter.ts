import { MutableRefObject, useEffect } from "react";

function useOutsideAlerter(
  ref: MutableRefObject<any>,
  callback: (...args: any[]) => any,
  prompt?: string,
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        if (!prompt || !window.confirm(prompt)) {
          callback();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, prompt]);
}

export default useOutsideAlerter;
