import { memo } from "react";
import { IScrollContainer } from "../lib";
import clsx from "clsx";
import { ORIENTATION_DICT } from "../lib/helpers";

export const ScrollContainer = memo<IScrollContainer>(
  ({ children, scrollOrientation = "vertical" }) => {
    return (
      <div
        className={clsx(
          "flex grow flex-col overflow-visible sm:overflow-y-hidden"
        )}
      >
        <div
          className={clsx(
            "hover:scroll-bar",
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
