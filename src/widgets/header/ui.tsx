import { memo } from "react";
import { useList, useUnit } from "effector-react";

import { models } from "./lib";
import { $selected, $menuItems } from "./model";
import { Icon } from "src/shared/ui/icon";
import { Logo } from "src/shared/ui/icons/logo";
import { NavItem } from "src/shared/ui/nav-item";
import { UserAvatarWithDropdown } from "src/entities/user";

export const Header = memo<models.IHeaderProps>(() => {
  const currentPage = useUnit($selected);
  return (
    <header className="flex items-center justify-center border-b border-gray-200 py-3 sm:py-4">
      <div className="container mx-auto my-0 flex w-full items-center justify-between gap-4 pl-4 pr-2 sm:px-8">
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
        <Icon
          size="normal"
          name="common/menu"
          className="text-gray-500 hover:text-gray-900 sm:hidden"
        />
      </div>
    </header>
  );
});

Header.displayName = "Header";
