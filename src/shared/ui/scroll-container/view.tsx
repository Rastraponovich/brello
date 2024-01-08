import { memo } from "react";

import { cx } from "~/shared/lib";

import { ORIENTATION_DICT } from "./constants";
import { type ScrollContainerProps } from "./model";

export const ScrollContainer = memo<ScrollContainerProps>(
  ({ children, scrollOrientation = "vertical" }) => {
    return (
      <div className="flex grow flex-col overflow-hidden">
        <div
          className={cx(
            "scroll-bar scroll-shadows  overflow-y-auto",
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
