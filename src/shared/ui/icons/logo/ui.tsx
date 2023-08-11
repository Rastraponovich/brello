import { Link } from "atomic-router-react";
import clsx from "clsx";
import { memo } from "react";

import { type ILogoProps } from "./lib";

export const Logo = memo<ILogoProps>(({ short, className, canHideTitle }) => {
  return (
    <Link
      to="/"
      className={clsx(
        "relative flex items-center gap-2.5",
        className,
        "after:content-[' '] after:absolute after:bottom-0 after:flex after:h-4 after:w-8 after:rounded-b-lg  after:backdrop-blur-[2px]",
      )}
    >
      <img src="/Logomark.svg" alt="logo" height={32} width={32} />

      {!short && (
        <img
          alt="title"
          height={32}
          src="/Brello.svg"
          className={clsx(canHideTitle && "hidden sm:flex")}
        />
      )}
    </Link>
  );
});
