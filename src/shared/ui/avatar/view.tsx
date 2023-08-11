import clsx from "clsx";
import { forwardRef, memo } from "react";

import { Icon } from "~/shared/ui/icon";

import {
  AVATAR_GROUP_SPACING,
  AVATAR_IMAGE_SIZE_DICT,
  AVATAR_SIZE_DICT,
  getShortName,
} from "./constants";
import type {
  AvatarAddButtonProps,
  AvatarCounterProps,
  AvatarGroupProps,
  AvatarProps,
} from "./model";

const _Avatar = forwardRef<HTMLDivElement, AvatarProps>(({ className, size = "md", user }, ref) => {
  return (
    <div
      ref={ref}
      data-qa="Avatar-button"
      title={
        !user?.firstName && !user?.lastName
          ? "unautorizied user"
          : `${user?.firstName} ${user?.lastName}`
      }
      className={clsx(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 font-medium text-gray-600",
        className,
        AVATAR_SIZE_DICT[size],
      )}
    >
      {user ? (
        !user.photo ? (
          <span data-qa="Avatar-button__name" className="uppercase">
            {getShortName(user)}
          </span>
        ) : (
          <img
            alt="user-image"
            src={`/${user?.photo}`}
            data-qa="Avatar-button__photo"
            height={AVATAR_IMAGE_SIZE_DICT[size]}
            width={AVATAR_IMAGE_SIZE_DICT[size]}
          />
        )
      ) : (
        <Icon
          name="common/user"
          data-qa="Avatar-button__icon"
          size={size === "md" ? "large" : "normal"}
        />
      )}
    </div>
  );
});

export const Avatar = memo(_Avatar);
Avatar.displayName = "Avatar";

export const AvatarCounter = forwardRef<HTMLDivElement, AvatarCounterProps>(
  ({ count, size }, ref) => {
    return (
      <div
        ref={ref}
        title={`more ${count}`}
        data-qa="Avatar-button__counter"
        className={clsx(
          "flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-gray-100 text-center font-medium text-gray-600",
          AVATAR_SIZE_DICT[size],
          size === "md" ? "text-base" : "text-sm",
        )}
      >
        +{count}
      </div>
    );
  },
);
AvatarCounter.displayName = "AvatarCounter";

export const AddAvatarButton = forwardRef<HTMLButtonElement, AvatarAddButtonProps>(
  ({ size }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        title="add user"
        data-qa="Avatar-add-button"
        className={clsx(
          "flex items-center justify-center rounded-full border border-dashed border-gray-300",
          size === "md" ? "p-1.5" : "p-1",
          AVATAR_SIZE_DICT[size],
        )}
      >
        <div className="rounded text-gray-400">
          <Icon data-qa="Avatar-add-icon" name="common/plus" size="normal" />
        </div>
      </button>
    );
  },
);
AddAvatarButton.displayName = "AddAvatarButton";

export const AvatarGroup = memo<AvatarGroupProps>(
  ({ items, size = "sm", itemClassName, counter, canAddedUser }) => {
    return (
      <div className="flex items-center gap-2" data-qa="Avatar-group">
        <div data-qa="Avatar-group__container" className={clsx(AVATAR_GROUP_SPACING[size], "flex")}>
          {items.map((item, idx) => (
            <Avatar
              key={idx}
              size={size}
              user={item}
              className={clsx("border-1.5px border-white", itemClassName)}
            />
          ))}
          {counter && <AvatarCounter size={size} count={counter} />}
        </div>
        {canAddedUser && <AddAvatarButton size={size} />}
      </div>
    );
  },
);
AvatarGroup.displayName = "AvatarGroup";
