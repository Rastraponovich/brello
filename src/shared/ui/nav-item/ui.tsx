import { forwardRef, memo } from "react";
import { cva } from "class-variance-authority";

import type { INavItemProps } from ".";

import { Icon } from "shared/ui/icon";
import { Link } from "atomic-router-react";

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

const _NavItem = forwardRef<HTMLAnchorElement, INavItemProps>(
  ({ path, selected, icon, title }, ref) => {
    return (
      <Link ref={ref} to={path || "/"} className={navItem({ selected })}>
        {icon && <Icon name={icon} className="text-gray-500" size="normal" />}
        <span>{title}</span>
      </Link>
    );
  },
);

export const NavItem = memo<INavItemProps>(_NavItem);

NavItem.displayName = "NavItem";
