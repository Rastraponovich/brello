import clsx from "clsx";
import { memo } from "react";
import { Avatar } from "src/shared/ui/avatar";
import { Logo } from "src/shared/ui/icons/logo";

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
      <Logo />
      {useUser && <Avatar />}
    </header>
  );
});

Header.displayName = "Header";
