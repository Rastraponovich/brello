import clsx from "clsx";
import { memo } from "react";

import { utils } from "~/shared/lib";
import { Icon } from "~/shared/ui/icon";

import { BUTTON_COLORS_DICT, Colors } from "./constants";
import { SocialButtonProps } from "./model";

export const SocialAuthButton = memo<SocialButtonProps>(
  ({ noCaption, social, theme = "colorWithBrand", className, disabled, pending, ...props }) => {
    return (
      <button
        {...props}
        disabled={pending ?? disabled}
        aria-disabled={pending ?? disabled}
        className={clsx(
          "flex items-center justify-center gap-3 rounded-lg border shadow-sm focus-within:ring-4 focus-within:ring-gray-100 focus:ring-4 focus:ring-gray-100 focus-visible:ring-4 focus-visible:ring-gray-100",
          "text-base font-semibold",
          theme === "brand" ? BUTTON_COLORS_DICT[social] : Colors.Default,
          noCaption ? "p-2.5" : "px-4 py-2.5",
          className,
        )}
      >
        <Icon name={`social/${social}-${theme}`} size="large" />
        {!noCaption && <span>Sign in with {utils.capitalize(social)}</span>}
      </button>
    );
  },
);
