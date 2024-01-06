import { useList, useStoreMap } from "effector-react";
import { memo, useReducer } from "react";

import { UserAvatarWithDropdown } from "~/entities/user";

import { cx } from "~/shared/lib";
import { Icon } from "~/shared/ui/icon";
import { Logo } from "~/shared/ui/logo";
import { NavItem as NavItemBase } from "~/shared/ui/nav-item";

import { $menuItems } from "./model";

export interface HeaderProps {
  className?: string;
  useUser?: boolean;
}

export const Header = memo<HeaderProps>(() => {
  const [opened, toggle] = useReducer((opened) => !opened, false);

  return (
    <header className="flex items-center justify-center border-b border-gray-200 py-3 sm:py-4">
      <div className="container mx-auto my-0 flex w-full items-center justify-between gap-4 pl-4 pr-2 sm:px-8 ">
        <Logo />

        <div className="hidden grow items-center justify-between sm:flex">
          <nav className="flex gap-1 text-base font-semibold text-gray-500">
            {useList($menuItems, {
              fn: ({ id }) => <NavItem id={id} />,
            })}
          </nav>
        </div>

        <UserAvatarWithDropdown />

        <NavButton opened={opened} toggle={toggle} />
      </div>
    </header>
  );
});

Header.displayName = "Header";

const NavItem = ({ id }: { id: number }) => {
  const { path, title, icon } = useStoreMap({
    keys: [id],
    store: $menuItems,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    fn: (nav) => nav.find((nav) => nav.id === id)!,
  });

  return <NavItemBase path={path} icon={icon} title={title} />;
};

const NavButton = ({ opened, toggle }: { opened: boolean; toggle: () => void }) => {
  return (
    <button
      onClick={toggle}
      className={cx(
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
