import { memo, useState } from "react";
import { useList, useUnit } from "effector-react";

import { models } from "./lib";
import { $selected, $menuItems } from "./model";
import { Icon } from "shared/ui/icon";
import { Logo } from "shared/ui/icons/logo";
import { NavItem } from "shared/ui/nav-item";
import { UserAvatarWithDropdown } from "entities/user";
import clsx from "clsx";

export const Header = memo<models.IHeaderProps>(() => {
  const [opened, setOpened] = useState(false);

  const currentPage = useUnit($selected);
  return (
    <header className="flex items-center justify-center border-b border-gray-200 py-3 sm:py-4">
      <div className="container mx-auto my-0 flex w-full items-center justify-between gap-4 pl-4 pr-2 sm:px-8 ">
        <Logo />
        <div className="hidden grow items-center justify-between sm:flex">
          <nav className="flex gap-1 text-base font-semibold text-gray-500">
            {useList($menuItems, {
              fn: (nav) => (
                <NavItem {...nav} selected={nav.path === currentPage} />
              ),
              keys: [currentPage],
            })}
          </nav>
        </div>
        <UserAvatarWithDropdown />
        <NavButton opened={opened} toggle={() => setOpened((prev) => !prev)} />
      </div>
    </header>
  );
});

Header.displayName = "Header";

const NavButton = ({
  opened,
  toggle,
}: {
  opened: boolean;
  toggle: () => void;
}) => {
  return (
    <button
      onClick={toggle}
      className={clsx(
        "rounded-lg p-2 sm:hidden",
        opened
          ? "hover:bg-white/15 text-white"
          : "bg-white text-gray-500 hover:text-gray-700 focus:text-gray-500 ",
      )}
    >
      <Icon size="normal" name={opened ? "common/x-close" : "common/menu"} />
    </button>
  );
};
