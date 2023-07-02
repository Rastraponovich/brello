import clsx from "clsx";
import { memo } from "react";
import { helpers, type models } from "../lib";

export const Bage = memo<models.IBageProps>(
  ({ size = "md", caption, variant = "standard", color = "blue" }) => {
    return (
      <div
        data-qa="Bage"
        title={caption}
        className={clsx(
          "flex items-center rounded-2xl",
          helpers.BAGE_SIZE_DICT[size],
          helpers.BAGE_BG_DICT[color],
          helpers.BAGE_TEXT_DICT[color]
        )}
      >
        {variant && variant === "dot" && (
          <i
            data-qa="Bage-dotIcon"
            className={clsx(
              "h-2 w-2 rounded-full",
              helpers.BAGE_DOT_DICT[color]
            )}
          />
        )}
        <span className="font-medium" title={caption} data-qa="Bage-text">
          {caption}
        </span>
      </div>
    );
  }
);

Bage.displayName = "Bage";
