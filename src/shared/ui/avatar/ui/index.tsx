import clsx from "clsx";
import { memo, useMemo } from "react";

import type { TUser } from "entities/user/lib";
import { type models, helpers } from "../lib";

import { Icon } from "shared/ui/icon";

function getShortName(user: TUser): string {
  let result = "";
  switch (true) {
    case Boolean(!user.lastName && user.firstName):
      result = `${user.firstName[0]}${user.firstName[1]}`;
      break;
    case user.lastName && !user.firstName:
      result = `${user.lastName[0]}${user.lastName[1]}`;
      break;
    case Boolean(user.lastName && user.firstName):
      result = `${user.firstName[0]}${user.lastName[0]}`;
      break;
    default:
      break;
  }

  return result;
}

export const Avatar = memo<models.IAvatarProps>(
  ({ className, size = "md", user }) => {
    return (
      <div
        data-qa="Avatar-button"
        title={
          !user?.firstName && !user?.lastName
            ? "unautorizied user"
            : `${user?.firstName} ${user?.lastName}`
        }
        className={clsx(
          "flex items-center justify-center overflow-hidden rounded-full bg-gray-100 font-medium text-gray-600",
          className,
          helpers.AVATAR_SIZE_DICT[size]
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
              src={user?.photo}
              data-qa="Avatar-button__photo"
              height={helpers.AVATAR_IMAGE_SIZE_DICT[size]}
              width={helpers.AVATAR_IMAGE_SIZE_DICT[size]}
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
  }
);
Avatar.displayName = "Avatar";

export const AvatarCounter = memo<models.IAvatarCounterProps>(
  ({ count, size }) => {
    const avatarCounterGetClass = useMemo(
      () =>
        clsx(
          "flex items-center justify-center rounded-full border-[1.5px] border-white bg-gray-100 text-center font-medium text-gray-600",
          helpers.AVATAR_SIZE_DICT[size],
          size === "md" ? "text-base" : "text-sm"
        ),
      [size]
    );

    return (
      <div
        title={`more ${count}`}
        data-qa="Avatar-button__counter"
        className={avatarCounterGetClass}
      >
        +{count}
      </div>
    );
  }
);
AvatarCounter.displayName = "AvatarCounter";

export const AddAvatarButton = memo<models.IAddAvatarButtonProps>(
  ({ size }) => {
    const avatarAddButtonGetClass = useMemo(
      () =>
        clsx(
          "flex items-center justify-center rounded-full border border-dashed border-gray-300",
          size === "md" ? "p-1.5" : "p-1",
          helpers.AVATAR_SIZE_DICT[size]
        ),
      [size]
    );
    return (
      <button
        type="button"
        title="add user"
        data-qa="Avatar-add-button"
        className={avatarAddButtonGetClass}
      >
        <div className="rounded text-gray-400">
          <Icon data-qa="Avatar-add-icon" name="common/plus" size="normal" />
        </div>
      </button>
    );
  }
);
AddAvatarButton.displayName = "AddAvatarButton";

export const AvatarGroup = memo<models.IAvatarGroup>(
  ({ items, size = "sm", itemClassName, counter, canAddedUser }) => {
    return (
      <div className="flex items-center gap-2" data-qa="Avatar-group">
        <div
          data-qa="Avatar-group__container"
          className={clsx(helpers.AVATAR_GROUP_SPACING[size], "flex")}
        >
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
  }
);
AvatarGroup.displayName = "AvatarGroup";
