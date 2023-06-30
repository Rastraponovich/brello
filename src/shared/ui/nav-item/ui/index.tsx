import clsx from "clsx";
import { memo } from "react";

import type { INavItemProps } from "..";
import { BaseIcon } from "shared/ui/icon";

export const NavItem = memo<INavItemProps>(
  ({ href, selected, icon, title }) => {
    return (
      <a
        href={href}
        className={clsx(
          "flex cursor-pointer items-center  gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-gray-50",
          selected && "bg-gray-50 text-gray-900"
        )}
      >
        {icon && <BaseIcon {...icon} className="text-gray-500" size="normal" />}
        <span>{title}</span>
      </a>
    );
  }
);

NavItem.displayName = "NavItem";
