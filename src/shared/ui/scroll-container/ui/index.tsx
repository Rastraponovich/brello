import { memo } from "react";
import { IScrollContainer } from "../lib";
import clsx from "clsx";
import { ORIENTATION_DICT } from "../lib/helpers";

export const ScrollContainer = memo<IScrollContainer>(
  ({ children, scrollOrientation = "vertical" }) => {
    return (
      <div className={clsx("flex grow flex-col overflow-hidden")}>
        <div
          className={clsx(
            "scroll-bar hover:scroll-bar-visible scroll-bar-invisible overflow-y-auto",
            ORIENTATION_DICT[scrollOrientation]
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);
ScrollContainer.displayName = "ScrollContainer";
