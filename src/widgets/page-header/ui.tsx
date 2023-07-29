import clsx from "clsx";
import type { IPageHeader } from "./models";

import { Avatar } from "shared/ui/avatar";
import { Button } from "shared/ui/button";
import { Heading } from "shared/ui/heading";
import { InputSearch } from "shared/ui/input";
import { memo } from "react";

export const PageHeader = memo<IPageHeader>(
  ({
    title,
    avatar,
    searchValue,
    onSearch,
    divider,
    actions,
    headingAs = "h1",
    description,
    className,
    heandingClassName,
  }) => {
    return (
      <header
        className={clsx(
          "flex w-full flex-col items-start  justify-between gap-4 sm:flex-row",
          divider ? "border-b border-gray-200 pb-5" : "border-transparent",
          className,
        )}
      >
        <div className="flex w-full shrink items-center gap-5 overflow-hidden">
          {avatar && <Avatar size="2xl" user={avatar} />}
          <div className="flex w-full shrink flex-col gap-1">
            <Heading
              as={headingAs}
              className={clsx(
                "text-2xl font-semibold text-gray-900",
                heandingClassName,
              )}
            >
              {title}
            </Heading>
            {description && (
              <span className="text-base font-normal text-gray-600">
                {description}
              </span>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex shrink-0 gap-3">
            {actions.map((action) => (
              <Button key={action.id} {...action}>
                {action.title}
              </Button>
            ))}
          </div>
        )}
        {onSearch && (
          <div className="w-full max-w-[320px] shrink-0 text-gray-500">
            <InputSearch value={searchValue} onChange={onSearch} />
          </div>
        )}
      </header>
    );
  },
);
