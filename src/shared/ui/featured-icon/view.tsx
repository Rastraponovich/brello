import { memo } from "react";

import { cx } from "~/shared/lib";
import { Sizes } from "~/shared/lib";
import { Icon } from "~/shared/ui/icon";

import {
  BORDER_SIZE,
  CIRCLE_COLORS,
  EFeaturedIconColor,
  EFeaturedIconType,
  EFeaturedIconVariant,
  FEATURED_ICON_CONTAINER_SIZE_DICT,
  FEATURED_ICON_SIZE_DICT,
  FEATURED_ICON_VARIANT_DICT,
  SQUARE_COLORS,
} from "./constants";
import type {
  FeaturedIconCircleVariant,
  FeaturedIconProps,
  FeaturedIconSquareVariant,
} from "./model";

export const FeaturedIcon = memo<FeaturedIconProps>(
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
        className={cx(
          "block",
          className,
          FEATURED_ICON_CONTAINER_SIZE_DICT[size],
          FEATURED_ICON_VARIANT_DICT[variant],
          type === "circle" && variant !== "lightCircle" && BORDER_SIZE[size],
          type === "circle"
            ? CIRCLE_COLORS[variant as FeaturedIconCircleVariant][color]
            : SQUARE_COLORS[variant as FeaturedIconSquareVariant],
        )}
      >
        <Icon name={icon} className={cx(FEATURED_ICON_SIZE_DICT[size])} />
      </div>
    );
  },
);

FeaturedIcon.displayName = "FeaturedIcon";
