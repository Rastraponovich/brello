import clsx from "clsx";
import { memo } from "react";
import {
  IAvatarGroup,
  IAvatarProps,
  AVATAR_SIZE_DICT,
  IAvatarCounterProps,
  IAddAvatarButtonProps,
} from "../lib";
import { PlusIcon } from "../../icons/common";

export const Avatar = memo<IAvatarProps>(({ className, size = "md", user }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full bg-gray-200 text-gray-300 focus:border-4 focus:border-blue-100",
        className,
        AVATAR_SIZE_DICT[size]
      )}
    >
      {!user && <UserIcon />}
      {user && !user.photo && <span>X</span>}
    </div>
  );
});
Avatar.displayName = "Avatar";

export const AvatarCounter = memo<IAvatarCounterProps>(({ count, size }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border-2 border-white bg-gray-100 text-center text-sm font-medium text-gray-600",
        AVATAR_SIZE_DICT[size]
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
        "flex items-center justify-center rounded-2xl border border-dashed border-gray-300 p-1",
        AVATAR_SIZE_DICT[size]
      )}
    >
      <div className=" rounded p-1 text-gray-400">
        <PlusIcon className="h-4 w-4" />
      </div>
    </button>
  );
});
AddAvatarButton.displayName = "AddAvatarButton";

const UserIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="64" height="64" rx="32" fill="#F2F4F7" />
      <path
        d="M42.6666 44C42.6666 42.1392 42.6666 41.2089 42.4369 40.4518C41.9199 38.7473 40.586 37.4134 38.8814 36.8963C38.1244 36.6667 37.194 36.6667 35.3332 36.6667H28.6666C26.8058 36.6667 25.8755 36.6667 25.1184 36.8963C23.4139 37.4134 22.08 38.7473 21.5629 40.4518C21.3333 41.2089 21.3333 42.1392 21.3333 44M37.9999 26C37.9999 29.3137 35.3136 32 31.9999 32C28.6862 32 25.9999 29.3137 25.9999 26C25.9999 22.6863 28.6862 20 31.9999 20C35.3136 20 37.9999 22.6863 37.9999 26Z"
        stroke="#475467"
        strokeWidth="2.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const AvatarGroup = memo<IAvatarGroup>(
  ({ items, size = "sm", itemClassName, counter }) => {
    return (
      <div className="relative flex -space-x-2">
        {items.map((item, idx) => (
          <Avatar
            key={idx}
            size={size}
            className={itemClassName}
            {...(item as object)}
          />
        ))}
        {counter && <AvatarCounter size={size} count={counter} />}
      </div>
    );
  }
);
AvatarGroup.displayName = "AvatarGroup";
