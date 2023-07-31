import clsx from "clsx";
import { memo } from "react";
import {
  SQUARE_COLORS,
  CIRCLE_COLORS,
  EFeaturedIconColor,
  EFeaturedIconVariant,
  FEATURED_ICON_CONTAINER_SIZE_DICT,
  FEATURED_ICON_SIZE_DICT,
  FEATURED_ICON_VARIANT_DICT,
  TFeaturedIconProps,
  EFeaturedIconType,
  TCircleVariant,
  TSquareVariant,
  BORDER_SIZE,
} from "../lib";
import { Sizes } from "shared/lib";

import { Icon } from "shared/ui/icon";

export const FeaturedIcon = memo<TFeaturedIconProps>(
  ({
    icon,
    className,
    size = Sizes.XS,
    color = EFeaturedIconColor.PRIMARY,
    type = EFeaturedIconType.CIRCLE,
    variant = EFeaturedIconVariant.LIGHT_CIRCLE,
  }) => {
    return (
      <div
        className={clsx(
          "block",
          className,
          FEATURED_ICON_CONTAINER_SIZE_DICT[size],
          FEATURED_ICON_VARIANT_DICT[variant],
          type === "circle" && variant !== "lightCircle" && BORDER_SIZE[size],
          type === "circle"
            ? CIRCLE_COLORS[variant as TCircleVariant][color]
            : SQUARE_COLORS[variant as TSquareVariant],
        )}
      >
        <Icon name={icon} className={clsx(FEATURED_ICON_SIZE_DICT[size])} />
      </div>
    );
  },
);

FeaturedIcon.displayName = "FeaturedIcon";
