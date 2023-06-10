import { memo } from "react";
import { Avatar } from "src/shared/ui/avatar";
import { SpriteIcons } from "src/shared/ui/icon";

interface IHeaderProps {
  foo?: "bar";
}
export const Header = memo<IHeaderProps>(() => {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 py-3 pl-4 pr-2 md:px-[112px] md:py-4">
      <a href="/" className="flex items-center">
        <SpriteIcons name="icon-logo" className="h-8 w-8" />
        <h2 className="ml-2.5 text-2xl font-bold text-black">Brello</h2>
      </a>
      <Avatar />
    </header>
  );
});

Header.displayName = "Header";
