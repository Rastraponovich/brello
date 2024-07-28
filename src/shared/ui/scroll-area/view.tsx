import * as ScrollArea from "@radix-ui/react-scroll-area";

import { cx } from "~/shared/lib";

interface ScrollContainerProps {
  className?: string;
  children: React.ReactNode;
  viewPortClassName?: string;
  verticalClassName?: string;
  horizontalClassName?: string;
  verticalThumbClassName?: string;
  horizontalThumbClassName?: string;
  type?: "auto" | "always" | "scroll" | "hover";
  orientation: "horizontal" | "vertical" | "both";
}

enum Orientation {
  Horizontal = "horizontal",
  Vertical = "vertical",
  Both = "both",
}

export function ScrollContainer(props: ScrollContainerProps) {
  const { children, viewPortClassName, className, type = "auto", orientation } = props;
  const {
    verticalClassName,
    horizontalClassName,
    verticalThumbClassName,
    horizontalThumbClassName,
  } = props;

  const isBoth = orientation === Orientation.Both;

  const isHorizontal = orientation === Orientation.Horizontal || isBoth;

  const isVertical = orientation === Orientation.Vertical || isBoth;

  return (
    <ScrollArea.Root className={cx("max-h-full overflow-hidden", className)} type={type}>
      <ScrollArea.Viewport className={cx("h-full w-full", viewPortClassName)}>
        {children}
      </ScrollArea.Viewport>

      {isHorizontal && (
        <ScrollArea.Scrollbar
          orientation={Orientation.Horizontal}
          className={cx(
            "flex touch-none select-none p-1 transition-colors duration-150 ease-out data-[orientation=horizontal]:h-4 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col",
            horizontalClassName,
          )}
        >
          <ScrollArea.Thumb
            className={cx(
              "relative flex-1 rounded-lg bg-[#EAECF0] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-4 before:w-full before:min-w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
              horizontalThumbClassName,
            )}
          />
        </ScrollArea.Scrollbar>
      )}

      {isVertical && (
        <ScrollArea.Scrollbar
          orientation={Orientation.Vertical}
          className={cx(
            "flex touch-none select-none p-1 transition-colors duration-150 ease-out data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-4 data-[orientation=horizontal]:flex-col",
            verticalClassName,
          )}
        >
          <ScrollArea.Thumb
            className={cx(
              "relative flex-1 rounded-lg bg-[#EAECF0] before:absolute before:left-1/2 before:top-1/2 before:h-full before:min-h-11 before:w-full before:min-w-4 before:-translate-x-1/2 before:-translate-y-1/2 before:content-['']",
              verticalThumbClassName,
            )}
          />
        </ScrollArea.Scrollbar>
      )}
      <ScrollArea.Corner />
    </ScrollArea.Root>
  );
}
