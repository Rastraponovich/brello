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
        "relative flex items-center gap-2.5 shrink-0",
        className,
        "after:content-[' '] after:absolute after:bottom-0 after:flex after:h-4 after:w-8 after:rounded-b-lg after:backdrop-blur-[2px]",
      )}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <LogoImage className="shrink-0 h-8 w-8" />

      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      {!short && <TitleImage className={cx(canHideTitle && "hidden sm:flex shrink-0 h-8 w-16")} />}
    </Link>
  );
});
