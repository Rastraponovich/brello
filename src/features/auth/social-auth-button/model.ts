import type { ButtonHTMLAttributes } from "react";

export type SocialButtonAuthServices =
  | "google"
  | "facebook"
  | "apple"
  | "figma"
  | "twitter"
  | "dribbble";

export interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  social: SocialButtonAuthServices;
  noCaption?: boolean;
  pending?: boolean;
  theme?: SocialButtonTheme;
}

export type SocialButtonTheme = "brand" | "color" | "colorWithBrand";
