import clsx from "clsx";
import { memo } from "react";
import {
  BAGE_BG_DICT,
  BAGE_DOT_DICT,
  BAGE_SIZE_DICT,
  BAGE_TEXT_DICT,
} from "../lib/helpers";
import { IBageProps } from "../lib/models";

export const Bage = memo<IBageProps>(
  ({ size = "md", caption, variant = "standard", color = "blue" }) => {
    return (
      <div
        className={clsx(
          "flex items-center rounded-2xl",
          BAGE_SIZE_DICT[size],
          BAGE_BG_DICT[color],
          BAGE_TEXT_DICT[color]
        )}
      >
        {variant && variant === "dot" && (
          <i className={clsx("h-2 w-2 rounded-full", BAGE_DOT_DICT[color])} />
        )}
        <span className="font-medium">{caption}</span>
      </div>
    );
  }
);

Bage.displayName = "Bage";
