import { memo, useMemo } from "react";

import { type TUser } from "../lib";

import { Avatar } from "src/shared/ui/avatar";
import { Dropdown } from "src/shared/ui/dropdown";
import { type TMenuItem } from "src/shared/ui/dropdown/lib";

type IUserCardSmallProps = TUser;
const UserCardSmall = memo<IUserCardSmallProps>(
  ({ firstName, lastName, email }) => {
    return (
      <div className="flex w-full flex-col px-4 py-3 text-sm text-gray-700">
        <h3 className="font-semibold">
          {firstName} {lastName}
        </h3>
        <span className="font-normal text-gray-600">{email}</span>
      </div>
    );
  },
);
UserCardSmall.displayName = "UserCardSmall";

export const UserAvatarWithDropdown = () => {
  const user: TUser = {
    firstName: "Vitaliy",
    lastName: "Wilde",
    email: "olivia@brello.io",
    id: 123123,
  };
  const menuItems = useMemo<TMenuItem[]>(
    () => [
      {
        id: 1,
        group: 1,
        text: "View profile",
        icon: "users/user",
        hotkey: "⌘K->P",
      },
      {
        id: 11,
        group: null,
        text: "Logout",
        icon: "common/log-out",
        hotkey: "⌥⇧Q",
      },
    ],
    [],
  );

  return (
    <Dropdown
      items={menuItems}
      groupProperty="group"
      buttonContent={<Avatar />}
      menuHead={<UserCardSmall {...user} />}
    />
  );
};
