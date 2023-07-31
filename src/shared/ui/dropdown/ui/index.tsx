import clsx from "clsx";
import {
  memo,
  Fragment,
  forwardRef,
  useCallback,
  type MouseEventHandler,
} from "react";

import type { IDropdownProps, IMenuItemProps } from "../lib/models";

import { ITEMS } from "../lib";

import { Icon } from "shared/ui/icon";
import { Menu, Transition } from "@headlessui/react";

const MenuItem = memo<IMenuItemProps>(
  forwardRef<null, IMenuItemProps>(
    ({ item, active, disabled, titleProperty, type = "menu" }, ref) => {
      const { icon, hotkey } = item;

      return (
        <button
          ref={ref}
          onClick={item.onClick}
          disabled={disabled}
          data-qa="Dropdown__menuItem"
          title={item[titleProperty] as string}
          className="flex w-full items-center p-2.5 text-left text-sm font-medium  text-gray-700 hover:bg-gray-50 disabled:text-gray-300"
        >
          {type === "checkbox" ? (
            <input type="checkbox" checked={active} data-qa="Input__checkbox" />
          ) : (
            icon && <Icon name={icon} size="large" data-qa="MenuItem-icon" />
          )}
          <span className="ml-2 w-full" data-qa="MenuItem__text">
            {item[titleProperty]}
          </span>
          <span
            title={hotkey}
            data-qa="MenuItem__hotkey"
            className="ml-3 shrink-0 text-xs font-normal text-gray-500 disabled:text-gray-300"
          >
            {hotkey}
          </span>
        </button>
      );
    },
  ),
);
MenuItem.displayName = "MenuItem";

export const Dropdown = memo<IDropdownProps>(
  ({
    menuHead,
    buttonContent,
    groupProperty,
    items = ITEMS,
    menuClassName,
    buttonClassName,
    keyProperty = "id",
    titleProperty = "text",
  }) => {
    const groups = groupProperty
      ? Array.from(new Set([...items.map((item) => item[groupProperty])]))
      : [];

    const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(() => {
      // console.log(e);
    }, []);

    const menuButtonGetClasses = useCallback(
      ({ open }: { open: boolean }) =>
        clsx(
          "flex w-full justify-center rounded-md text-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
          open ? "text-gray-700" : "text-gray-400",
          buttonClassName,
        ),
      [buttonClassName],
    );

    return (
      <Menu
        as="div"
        data-qa="Dropdown"
        className={clsx("relative inline-block text-left", menuClassName)}
      >
        <div>
          <Menu.Button
            title="open dropdown"
            data-qa="Dropdown-button"
            className={menuButtonGetClasses}
          >
            {buttonContent}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          leaveTo="transform opacity-0 scale-95"
          leave="transition ease-in duration-75"
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leaveFrom="transform opacity-100 scale-100"
        >
          <Menu.Items
            data-qa="Dropdown-menuItems"
            className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div data-qa="Dropdown-menuItems__header">{menuHead}</div>
            {!groupProperty && (
              <div
                className="gap-1 px-1.5 py-1"
                data-qa="Dropdown-menuItems__container"
              >
                {items.map((item) => (
                  <Menu.Item key={item.id}>
                    {(renderProps) => (
                      <MenuItem
                        {...renderProps}
                        item={item}
                        onClick={onClick}
                        keyProperty={keyProperty}
                        titleProperty={titleProperty}
                      />
                    )}
                  </Menu.Item>
                ))}
              </div>
            )}
            {groupProperty &&
              groups.map((group, id) => (
                <div
                  key={id}
                  className="flex flex-col"
                  data-qa="Dropdown-menuItems__container"
                >
                  {items
                    .filter((item) => item[groupProperty] === group)
                    .map((filtered) => (
                      <Menu.Item key={filtered.id}>
                        {(renderProps) => (
                          <MenuItem
                            {...renderProps}
                            item={filtered}
                            onClick={onClick}
                            keyProperty={keyProperty}
                            titleProperty={titleProperty}
                          />
                        )}
                      </Menu.Item>
                    ))}
                </div>
              ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  },
);

Dropdown.displayName = "Dropdown";
