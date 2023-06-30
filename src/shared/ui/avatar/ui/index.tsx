import clsx from "clsx";
import { memo } from "react";
import {
  IAvatarGroup,
  IAvatarProps,
  AVATAR_SIZE_DICT,
  IAvatarCounterProps,
  IAddAvatarButtonProps,
  AVATAR_GROUP_SPACING,
} from "../lib";
import { BaseIcon } from "../../icon";

export const Avatar = memo<IAvatarProps>(({ className, size = "md", user }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-gray-100 text-gray-600",
        className,
        AVATAR_SIZE_DICT[size]
      )}
    >
      {!user && (
        <BaseIcon
          source="users"
          icon="user"
          size={size === "md" ? "large" : "normal"}
        />
      )}
      {user && !user.photo && <span>X</span>}
    </div>
  );
});
Avatar.displayName = "Avatar";

export const AvatarCounter = memo<IAvatarCounterProps>(({ count, size }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border-[1.5px] border-white bg-gray-100 text-center font-medium text-gray-600",
        AVATAR_SIZE_DICT[size],
        size === "md" ? "text-base" : "text-sm"
      )}
    >
      +{count}
    </div>
  );
});
AvatarCounter.displayName = "AvatarCounter";

export const AddAvatarButton = memo<IAddAvatarButtonProps>(({ size }) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center rounded-full border border-dashed border-gray-300",
        size === "md" ? "p-1.5" : "p-1",
        AVATAR_SIZE_DICT[size]
      )}
    >
      <div className="rounded text-gray-400">
        <BaseIcon size="normal" source="general" icon="plus" />
      </div>
    </button>
  );
});
AddAvatarButton.displayName = "AddAvatarButton";

export const AvatarGroup = memo<IAvatarGroup>(
  ({ items, size = "sm", itemClassName, counter, canAddedUser }) => {
    return (
      <div className="flex items-center gap-2">
        <div className={clsx(AVATAR_GROUP_SPACING[size], "flex")}>
          {items.map((item, idx) => (
            <Avatar
              key={idx}
              size={size}
              className={clsx("border-[1.5px] border-white", itemClassName)}
              {...(item as object)}
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
