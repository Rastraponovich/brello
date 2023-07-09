import clsx from "clsx";
import { forwardRef, memo } from "react";

import { type models, helpers } from "../lib";

import { Icon } from "shared/ui/icon";

const _Avatar = forwardRef<HTMLDivElement, models.IAvatarProps>(
  ({ className, size = "md", user }, ref) => {
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
          helpers.AVATAR_SIZE_DICT[size],
        )}
      >
        {user ? (
          !user.photo ? (
            <span data-qa="Avatar-button__name" className="uppercase">
              {helpers.getShortName(user)}
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
  },
);
export const Avatar = memo(_Avatar);
Avatar.displayName = "Avatar";

export const AvatarCounter = forwardRef<
  HTMLDivElement,
  models.IAvatarCounterProps
>(({ count, size }, ref) => {
  return (
    <div
      ref={ref}
      title={`more ${count}`}
      data-qa="Avatar-button__counter"
      className={clsx(
        "flex shrink-0 items-center justify-center rounded-full border-[1.5px] border-white bg-gray-100 text-center font-medium text-gray-600",
        helpers.AVATAR_SIZE_DICT[size],
        size === "md" ? "text-base" : "text-sm",
      )}
    >
      +{count}
    </div>
  );
});
AvatarCounter.displayName = "AvatarCounter";

export const AddAvatarButton = forwardRef<
  HTMLButtonElement,
  models.IAddAvatarButtonProps
>(({ size }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      title="add user"
      data-qa="Avatar-add-button"
      className={clsx(
        "flex items-center justify-center rounded-full border border-dashed border-gray-300",
        size === "md" ? "p-1.5" : "p-1",
        helpers.AVATAR_SIZE_DICT[size],
      )}
    >
      <div className="rounded text-gray-400">
        <Icon data-qa="Avatar-add-icon" name="common/plus" size="normal" />
      </div>
    </button>
  );
});
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
  },
);
AvatarGroup.displayName = "AvatarGroup";
