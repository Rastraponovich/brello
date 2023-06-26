import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { memo, useCallback } from "react";
import { Fragment } from "react";
import { IDropdownProps, IMenuItemProps } from "../lib/models";
import { items } from "../lib";

const MenuItem = memo<IMenuItemProps>(({ item, active, disabled, onClick }) => {
  const { text, icon, hotkey } = item;

  const isCheckbox = active !== undefined;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className=" flex items-center p-2.5 text-left text-sm font-medium  text-gray-700 hover:bg-gray-50 disabled:text-gray-300"
    >
      {isCheckbox ? <span>checkbox</span> : icon}
      <span className="ml-2 w-full">{text}</span>
      <span className="ml-3 shrink-0 text-xs font-normal text-gray-500 disabled:text-gray-300">
        {hotkey}
      </span>
    </button>
  );
});
MenuItem.displayName = "MenuItem";

export const Dropdown = memo<IDropdownProps>(
  ({ buttonContent, buttonClassName, menuHead, groupProperty }) => {
    const groups = groupProperty
      ? Array.from(new Set([...items.map((item) => item[groupProperty])]))
      : [];

    const onClick = useCallback((e) => {
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
          <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {menuHead}
            {!groupProperty && (
              <div className="gap-1 px-1.5 py-1">
                {items.map((item) => (
                  <Menu.Item key={item.id}>
                    {({ active, disabled }) => (
                      <MenuItem
                        item={item}
                        active={active}
                        disabled={disabled}
                        onClick={onClick}
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      />
                      //   {active ? (
                      //     <EditActiveIcon
                      //       className="mr-2 h-5 w-5"
                      //       aria-hidden="true"
                      //     />
                      //   ) : (
                      //     <EditInactiveIcon
                      //       className="mr-2 h-5 w-5"
                      //       aria-hidden="true"
                      //     />
                      //   )}
                      //   Edit
                      // </button>
                    )}
                  </Menu.Item>
                ))}
                {/* <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DuplicateActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <DuplicateInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Duplicate
                  </button>
                )}
              </Menu.Item> */}
              </div>
            )}
            {groupProperty &&
              groups.map((group, id) => (
                <div key={id} className="flex flex-col">
                  {items
                    .filter((item) => item[groupProperty] === group)
                    .map((filtered) => (
                      <MenuItem
                        key={filtered.id}
                        item={filtered}
                        onClick={onClick}
                      />
                    ))}
                </div>
              ))}
            {/* <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ArchiveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArchiveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Archive
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <MoveActiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    ) : (
                      <MoveInactiveIcon
                        className="mr-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    )}
                    Move
                  </button>
                )}
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <DeleteActiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <DeleteInactiveIcon
                        className="mr-2 h-5 w-5 text-violet-400"
                        aria-hidden="true"
                      />
                    )}
                    Delete
                  </button>
                )}
              </Menu.Item>
            </div> */}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
);

Dropdown.displayName = "Dropdown";
