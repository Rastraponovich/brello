import { Link } from "atomic-router-react";
import { forwardRef } from "react";

import { Icon } from "~/shared/ui/icon";

import type { NavItemProps } from "./model";

export const NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(({ path, icon, title }, ref) => {
  return (
    <Link
      ref={ref}
      to={path}
      activeClassName="bg-gray-50 text-gray-900"
      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50"
    >
      {icon && <Icon name={icon} className="text-gray-500" size="normal" />}

      <span>{title}</span>
    </Link>
  );
});

NavItem.displayName = "NavItem";
