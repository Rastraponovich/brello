import { useUnit } from "effector-react";
import { memo, useMemo } from "react";

import { Avatar } from "~/shared/ui/avatar";
import { Dropdown, type TMenuItem } from "~/shared/ui/dropdown";

import { $profile, type TUser, logOutButtonClicked, viewProfileButtonClicked } from "./model";

type UserCardSmallProps = TUser;

export interface UserProps {
  item: TUser;
}
const UserCardSmall = memo<UserCardSmallProps>(({ firstName, lastName, email }) => {
  return (
    <div className="flex w-full flex-col px-4 py-3 text-sm text-gray-700">
      <h3 className="font-semibold">
        {firstName} {lastName}
      </h3>
      <span className="font-normal text-gray-600">{email}</span>
    </div>
  );
});

UserCardSmall.displayName = "UserCardSmall";

export const UserAvatarWithDropdown = () => {
  const [openUser, logout] = useUnit([viewProfileButtonClicked, logOutButtonClicked]);
  const profile = useUnit($profile);

  const user: TUser = {
    firstName: profile?.first_name || "Vitaliy",
    lastName: profile?.last_name || "Wilde",
    email: "olivia@brello.io",
    id: profile?.id || "",
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
      menuClassName="hidden sm:block"
    />
  );
};
