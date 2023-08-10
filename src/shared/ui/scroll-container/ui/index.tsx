import clsx from "clsx";
import { memo } from "react";

import { type IScrollContainer } from "../lib";
import { ORIENTATION_DICT } from "../lib/helpers";

export const ScrollContainer = memo<IScrollContainer>(
  ({ children, scrollOrientation = "vertical" }) => {
    return (
      <div className="flex grow flex-col overflow-hidden">
        <div
          className={clsx(
            "scroll-bar scroll-shadows hover:scroll-bar-visible scroll-bar-invisible overflow-y-auto",
            ORIENTATION_DICT[scrollOrientation],
          )}
        >
          {children}
        </div>
      </div>
    );
  },
);
ScrollContainer.displayName = "ScrollContainer";
