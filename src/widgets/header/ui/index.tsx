import clsx from "clsx";
import { memo } from "react";
import { Avatar } from "src/shared/ui/avatar";
import { SpriteIcons } from "src/shared/ui/icon";

interface IHeaderProps {
  foo?: "bar";
  className?: string;
  useUser?: boolean;
}
export const Header = memo<IHeaderProps>(({ className, useUser = true }) => {
  return (
    <header
      className={clsx(
        "flex items-center justify-between   ",
        className
          ? className
          : "border-b border-gray-200 py-3 pl-4 pr-2 md:px-[112px] md:py-4"
      )}
    >
      <a href="/" className="flex items-center">
        <SpriteIcons name="icon-logo" className="h-8 w-8" />
        <h2 className="ml-2.5 text-2xl font-bold text-black">Brello</h2>
      </a>
      {useUser && <Avatar />}
    </header>
  );
});

Header.displayName = "Header";
