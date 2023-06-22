import { memo } from "react";
import {
  LayersTwoIcon,
  MenuIcon,
  UserCircleIcon,
} from "src/shared/ui/icons/featured-icon/ui";
import { Logo } from "src/shared/ui/icons/logo";
import { NavItem, TNavItem } from "src/shared/ui/nav-item";

interface IHeaderProps {
  className?: string;
  useUser?: boolean;
}

const navs: TNavItem[] = [
  { id: 1, title: "boards", icon: <LayersTwoIcon /> },
  { id: 2, title: "members", icon: <UserCircleIcon /> },
];

export const Header = memo<IHeaderProps>(() => {
  const selected = 1;
  return (
    <header className="flex items-center justify-center border-b border-gray-200 py-3 sm:py-4">
      <div className="container mx-auto my-0 flex w-full items-center justify-between gap-4 pl-4 pr-2 sm:px-8">
        <Logo />
        <div className="hidden grow items-center justify-between gap-1 sm:flex">
          <nav className="flex text-base font-semibold text-gray-500">
            {navs.map((nav) => (
              <NavItem key={nav.id} {...nav} selected={nav.id === selected} />
            ))}
          </nav>
        </div>
        <MenuIcon className="text-gray-500 hover:text-gray-900 sm:hidden" />
      </div>
    </header>
  );
});

Header.displayName = "Header";
