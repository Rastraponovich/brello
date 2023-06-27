import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import {
  MouseEventHandler,
  forwardRef,
  memo,
  useCallback,
  cloneElement,
  ReactElement,
} from "react";
import { Fragment } from "react";
import { IDropdownProps, IMenuItemProps } from "../lib/models";
import { ITEMS } from "../lib";
import { LogoutIcon } from "../../icons/common";
LogoutIcon;

const MenuItem = memo<IMenuItemProps>(
  forwardRef<null, IMenuItemProps>(
    (
      { item, active, disabled, onClick, titleProperty, type = "menu" },
      ref
    ) => {
      const { icon: Icon, hotkey } = item;

      return (
        <button
          disabled={disabled}
          onClick={onClick}
          ref={ref}
          className=" flex items-center p-2.5 text-left text-sm font-medium  text-gray-700 hover:bg-gray-50 disabled:text-gray-300"
        >
          {type === "checkbox" ? (
            <input type="checkbox" checked={active} />
          ) : (
            Icon && cloneElement(Icon as ReactElement, { className: "h-5 w-5" })
          )}
          <span className="ml-2 w-full">{item[titleProperty]}</span>
          <span className="ml-3 shrink-0 text-xs font-normal text-gray-500 disabled:text-gray-300">
            {hotkey}
          </span>
        </button>
      );
    }
  )
);
MenuItem.displayName = "MenuItem";

export const Dropdown = memo<IDropdownProps>(
  ({
    buttonContent,
    buttonClassName,
    menuHead,
    groupProperty,
    items = ITEMS,
    titleProperty = "text",
    keyProperty = "id",
  }) => {
    const groups = groupProperty
      ? Array.from(new Set([...items.map((item) => item[groupProperty])]))
      : [];

    const onClick = useCallback<MouseEventHandler<HTMLButtonElement>>((e) => {
      console.log(e);
    }, []);

    return (
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button
            className={({ open }) =>
              clsx(
                "flex w-full justify-center rounded-md text-sm  focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75",
                open ? "text-gray-700" : "text-gray-400",
                buttonClassName
              )
            }
          >
            {buttonContent}
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-lg border-gray-200 bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuHead}
            {!groupProperty && (
              <div className="gap-1 px-1.5 py-1">
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
                <div key={id} className="flex flex-col">
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
  }
);

Dropdown.displayName = "Dropdown";
