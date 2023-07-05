import { memo, useMemo } from "react";
import { useUnit } from "effector-react";

import { logOutButtonClicked, viewProfileButtonClicked } from "../model";

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
  const [openUser, logout] = useUnit([
    viewProfileButtonClicked,
    logOutButtonClicked,
  ]);

  const user: TUser = {
    firstName: "Vitaliy",
    lastName: "Wilde",
    email: "olivia@brello.io",
    id: 123123,
  };
  const menuItems = useMemo<TMenuItem[]>(
    () => [
      {
        group: 1,
        hotkey: "⌘K->P",
        id: "viewProfile",
        onClick: openUser,
        icon: "users/user",
        text: "View profile",
      },
      {
        group: null,
        id: "logout",
        hotkey: "⌥⇧Q",
        text: "Logout",
        onClick: logout,
        icon: "common/log-out",
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
