import { memo } from "react";

import { cx } from "~/shared/lib";
import { Avatar } from "~/shared/ui/avatar";
import { Button } from "~/shared/ui/button";
import { Heading } from "~/shared/ui/heading";
import { Input } from "~/shared/ui/input";

import type { PageHeaderProps } from "./model";

export const PageHeader = memo<PageHeaderProps>(
  ({
    title,
    avatar,
    divider,
    actions,
    onSearch,
    className,
    description,
    searchValue,
    avatarImage,
    headingAs = "h1",
    heandingClassName,
    placeholder = "search",
  }) => {
    return (
      <header
        className={cx(
          "flex w-full flex-col items-center  justify-between gap-4 sm:flex-row",
          divider ? "border-b border-gray-200 pb-5" : "border-transparent",
          className,
        )}
      >
        <div className="flex w-full shrink items-center gap-5 overflow-hidden">
          {avatar && !avatarImage && <Avatar size="2xl" user={avatar} />}
          {avatarImage && (
            <div>
              <img
                width={64}
                height={64}
                alt="avatar"
                className="shink-0 object-cover rounded-full"
                src={`https://ddjirrggtysituolvxws.supabase.co/storage/v1/object/public/avatars/${avatarImage}`}
              />
            </div>
          )}

          <div className="flex w-full shrink flex-col  gap-1">
            <Heading as={headingAs} className={heandingClassName}>
              {title}
            </Heading>

            {description && (
              <span className="text-base font-normal text-gray-600">{description}</span>
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
            <Input
              size="sm"
              type="search"
              value={searchValue}
              onValueChange={onSearch}
              placeholder={placeholder}
            />
          </div>
        )}
      </header>
    );
  },
);

export const PageHeaderSkeleton = ({ divider, className, actions }: Partial<PageHeaderProps>) => {
  return (
    <header
      className={cx(
        "flex w-full flex-col items-center  justify-between gap-4 sm:flex-row",
        divider ? "border-b border-gray-200 pb-5" : "border-transparent",
        className,
      )}
    >
      <div className="flex w-full shrink items-center gap-5 overflow-hidden">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gray-200" />
        <div className="flex w-full shrink flex-col gap-1">
          <div className="h-9 w-80 animate-pulse rounded-lg bg-gray-200" />
          <div className="h-6 w-40 animate-pulse rounded-lg bg-gray-200" />
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
    </header>
  );
};
