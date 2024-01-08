import { Link } from "atomic-router-react";
import { memo } from "react";

import { cx } from "~/shared/lib";
import { routes } from "~/shared/routing";

import LogoImage from "./assets/logo.svg";
import TitleImage from "./assets/title.svg";
import { type LogoProps } from "./model";

export const Logo = memo<LogoProps>(({ short, className, canHideTitle }) => {
  return (
    <Link
      to={routes.home}
      className={cx(
        "relative flex shrink-0 items-center gap-2.5",
        className,
        "after:content-[' '] after:absolute after:bottom-0 after:flex after:h-4 after:w-8 after:rounded-b-lg after:backdrop-blur-[2px]",
      )}
    >
      <LogoImage className="h-8 w-8 shrink-0" />

      {!short && <TitleImage className={cx(canHideTitle && "hidden h-8 w-16 shrink-0 sm:flex")} />}
    </Link>
  );
});
