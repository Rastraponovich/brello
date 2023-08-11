import { Link } from "atomic-router-react";
import { cva } from "class-variance-authority";
import { forwardRef, memo } from "react";

import { Icon } from "~/shared/ui/icon";

import type { NavItemProps } from "./model";

const navItem = cva(
  "flex cursor-pointer items-center  gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50",
  {
    variants: {
      selected: {
        true: "bg-gray-50 text-gray-900",
      },
    },
  },
);

const _NavItem = forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ path, selected, icon, title }, ref) => {
    return (
      <Link ref={ref} to={path || "/"} className={navItem({ selected })}>
        {icon && <Icon name={icon} className="text-gray-500" size="normal" />}
        <span>{title}</span>
      </Link>
    );
  },
);

export const NavItem = memo<NavItemProps>(_NavItem);

NavItem.displayName = "NavItem";
