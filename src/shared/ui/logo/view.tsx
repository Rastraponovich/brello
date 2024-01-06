import { Link } from "atomic-router-react";
import { memo } from "react";

import { cx } from "~/shared/lib";

import { type LogoProps } from "./model";

export const Logo = memo<LogoProps>(({ short, className, canHideTitle }) => {
  return (
    <Link
      to="/"
      className={cx(
        "relative flex items-center gap-2.5 shrink-0",
        className,
        "after:content-[' '] after:absolute after:bottom-0 after:flex after:h-4 after:w-8 after:rounded-b-lg  after:backdrop-blur-[2px]",
      )}
    >
      <img src="/Logomark.svg" alt="logo" height={32} width={32} className="shrink-0" />

      {!short && (
        <img
          width={66}
          height={32}
          alt="Brello"
          src="/Brello.svg"
          className={cx(canHideTitle && "hidden sm:flex shrink-0")}
        />
      )}
    </Link>
  );
});
