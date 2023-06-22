import { SVGProps } from "react";

export interface ILogoIconProps extends SVGProps<SVGSVGElement> {
  foo?: "bar";
}

export interface ILogoProps {
  short?: boolean;
  className?: string;
}
