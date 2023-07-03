import { memo, useMemo } from "react";
import { Dropdown } from "src/shared/ui/dropdown";
import { Avatar } from "src/shared/ui/avatar";
import { LogoutIcon } from "src/shared/ui/icons/common";
import { TMenuItem } from "src/shared/ui/dropdown/lib";
import { TUser } from "../lib";

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
  }
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
      { id: 1, group: 1, text: "View profile", icon: "", hotkey: "⌘K->P" },
      {
        id: 11,
        group: null,
        text: "Logout",
        icon: <LogoutIcon />,
        hotkey: "⌥⇧Q",
      },
    ],
    []
  );

  return (
    <Dropdown
      buttonContent={<Avatar />}
      items={menuItems}
      groupProperty="group"
      menuHead={<UserCardSmall {...user} />}
    />
  );
};
