import clsx from "clsx";
import { memo } from "react";
import { Icon } from "src/shared/ui/icon";
import { type models, helpers } from "../lib";
import { utils } from "src/shared/lib";

export const SocialAuthButton = memo<models.ISocialButtonProps>(
  ({ noCaption, social, theme = "colorWithBrand", className, ...props }) => {
    return (
      <button
        {...props}
        className={clsx(
          "flex items-center justify-center gap-3 rounded-lg border shadow-sm focus-within:ring-4 focus-within:ring-gray-100 focus:ring-4 focus:ring-gray-100 focus-visible:ring-4 focus-visible:ring-gray-100",
          "text-base font-semibold",
          theme === "brand"
            ? helpers.BUTTON_COLORS_DICT[social]
            : helpers.Colors.Default,
          noCaption ? "p-2.5" : "px-4 py-2.5",
          className
        )}
      >
        <Icon name={`social/${social}-${theme}`} size="large" />
        {!noCaption && <span>Sign in with {utils.capitalize(social)}</span>}
      </button>
    );
  }
);
