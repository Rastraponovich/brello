import { ButtonHTMLAttributes } from "react";

export type TAuthServices = "google" | "facebook" | "apple" | "figma" | "twitter" | "dribbble";

export interface ISocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  social: TAuthServices;
  noCaption?: boolean;
  pending?: boolean;
  theme?: TButtonTheme;
}

export type TButtonTheme = "brand" | "color" | "colorWithBrand";
