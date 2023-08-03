import { MutableRefObject, useRef, useEffect, WheelEvent } from "react";

export const useHorizontalScroll = (): MutableRefObject<HTMLDivElement> => {
  const elRef = useRef<HTMLDivElement>();

  useEffect(() => {
    const el = elRef.current;

    if (el) {
      const onWheel = (e: WheelEvent<HTMLDivElement>) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "smooth",
        });
      };

      el.addEventListener("wheel", onWheel as unknown as EventListenerOrEventListenerObject);
      return () =>
        el.removeEventListener("wheel", onWheel as unknown as EventListenerOrEventListenerObject);
    }
  }, []);
  return elRef as MutableRefObject<HTMLDivElement>;
};
