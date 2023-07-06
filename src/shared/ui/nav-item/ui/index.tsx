import clsx from "clsx";
import { forwardRef, memo } from "react";

import type { INavItemProps } from "..";

import { Icon } from "shared/ui/icon";

const _NavItem = forwardRef<HTMLAnchorElement, INavItemProps>(
  ({ href, selected, icon, title }, ref) => {
    return (
      <a
        href={href}
        ref={ref}
        className={clsx(
          "flex cursor-pointer items-center  gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50",
          selected && "bg-gray-50 text-gray-900",
        )}
      >
        {icon && <Icon name={icon} className="text-gray-500" size="normal" />}
        <span>{title}</span>
      </a>
    );
  },
);

export const NavItem = memo<INavItemProps>(_NavItem);

NavItem.displayName = "NavItem";
