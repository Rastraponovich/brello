import { ButtonHTMLAttributes } from "react";
import { TButtonTextAlign } from "src/shared/ui/button";

export type TAuthServices =
  | "google"
  | "facebook"
  | "apple"
  | "figma"
  | "twitter"
  | "dribbble";

export interface ISocialButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  authService: TAuthServices;
  textAlign?: TButtonTextAlign;
  noCaption?: boolean;
}
