import {MutableRefObject, useEffect} from "react";

function useOutsideAlerter(ref: MutableRefObject<any>, callback: (...args: any[]) => any, prompt?: string) {
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target)) {
                console.log("You clicked outside of me!");
                if (!prompt || !window.confirm(prompt)) {
                    console.log("You clicked outside of me!", 'inner');
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