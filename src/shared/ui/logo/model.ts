import type { SVGProps } from "react";

export interface LogoIconProps extends SVGProps<SVGSVGElement> {
  foo?: "bar";
}

export interface LogoProps {
  short?: boolean;
  className?: string;
  canHideTitle?: boolean;
}
