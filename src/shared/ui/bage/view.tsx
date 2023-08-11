import clsx from "clsx";
import { forwardRef, memo } from "react";

import { BAGE_BG_DICT, BAGE_DOT_DICT, BAGE_SIZE_DICT, BAGE_TEXT_DICT } from "./constants";
import type { BageProps } from "./model";

const _Bage = forwardRef<HTMLDivElement, BageProps>(
  ({ size = "md", caption, variant = "standard", color = "blue" }, ref) => {
    return (
      <div
        ref={ref}
        data-qa="Bage"
        title={caption}
        className={clsx(
          "flex items-center rounded-2xl",
          BAGE_SIZE_DICT[size],
          BAGE_BG_DICT[color],
          BAGE_TEXT_DICT[color],
        )}
      >
        {variant && variant === "dot" && (
          <i
            data-qa="Bage-dotIcon"
            className={clsx("h-2 w-2 rounded-full", BAGE_DOT_DICT[color])}
          />
        )}
        <span className="font-medium" title={caption} data-qa="Bage-text">
          {caption}
        </span>
      </div>
    );
  },
);

export const Bage = memo<BageProps>(_Bage);

Bage.displayName = "Bage";
