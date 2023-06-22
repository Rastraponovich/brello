import { cloneElement, memo } from "react";
import { INavItemProps } from "..";
import clsx from "clsx";

export const NavItem = memo<INavItemProps>(
  ({ href, selected, icon, title }) => {
    return (
      <a
        href={href}
        className={clsx(
          "flex cursor-pointer gap-3 rounded-md px-3  py-2 text-gray-700 hover:bg-gray-50",
          selected && "bg-gray-50 text-gray-900"
        )}
      >
        {icon && cloneElement(icon, { className: "text-gray-500" })}
        <span>{title}</span>
      </a>
    );
  }
);

NavItem.displayName = "NavItem";
