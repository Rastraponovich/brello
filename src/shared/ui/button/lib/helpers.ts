import { TButtonSize, TButtonTextAlign, TVariant } from ".";

enum CloseXButtonSize {
  SM = "p-2",
  MD = "p-2.5",
  LG = "p-2.5",
}

export const CLOSE_BUTTON_SIZE_DICT: Record<
  "sm" | "md" | "lg",
  CloseXButtonSize
> = {
  sm: CloseXButtonSize.SM,
  md: CloseXButtonSize.MD,
  lg: CloseXButtonSize.LG,
};

enum CloseXButtonVariant {
  PRIMARY = "text-blue-500 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50",
  GRAY = "text-gray-500 hover:bg-gray-50 hover:text-gray-600 focus:bg-gray-50",
}

export const CLOSE_BUTTON_VARIANT_DICT: Record<
  "primary" | "gray",
  CloseXButtonVariant
> = {
  primary: CloseXButtonVariant.PRIMARY,
  gray: CloseXButtonVariant.GRAY,
};

enum ButtonIconSize {
  XS = "p-2",
  SM = "p-2.5",
  MD = "p-3",
  LG = "p-3.5",
  XL = "p-4",
}

export const BUTTON_ICON_SIZE: Record<TButtonSize, ButtonIconSize> = {
  xs: ButtonIconSize.XS,
  sm: ButtonIconSize.SM,
  md: ButtonIconSize.MD,
  lg: ButtonIconSize.LG,
  xl: ButtonIconSize.XL,
};

enum ButtonTextSize {
  XS = "text-sm",
  SM = "text-sm",
  MD = "text-base",
  LG = "text-base",
  XL = "text-xl",
}
export const BUTTON_TEXT_SIZE_DICT: Record<TButtonSize, ButtonTextSize> = {
  xs: ButtonTextSize.XS,
  sm: ButtonTextSize.SM,
  md: ButtonTextSize.MD,
  lg: ButtonTextSize.LG,
  xl: ButtonTextSize.XL,
};

enum ButtonSize {
  XS = "py-2 px-3.5",
  SM = "py-2.5 px-4",
  MD = "py-2.5 px-4.5",
  LG = "py-3 px-5",
  XL = "py-4 px-7",
}
export const BUTTON_SIZES_DICT: Record<TButtonSize, ButtonSize> = {
  xs: ButtonSize.XS,
  sm: ButtonSize.SM,
  md: ButtonSize.MD,
  lg: ButtonSize.LG,
  xl: ButtonSize.XL,
};

enum ButtonColors {
  LINK = "text-blue-700 hover:text-blue-800 disabled:text-gray-300",
  LINK_GRAY = "text-gray-600 disabled:text-gray-300 hover:text-gray-700",
  PRIMARY = "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-200",
  TERTIARY = "text-blue-700 hover:bg-blue-50 hover:text-blue-800 disabled:text-gray-300",
  TERTIARY_GRAY = "text-gray-600 disabled:text-gray-300 hover:bg-gray-50 hover:text-gray-700",
  SECONDARY = "border-blue-50 text-blue-700 bg-blue-50 hover:bg-blue-100 hover:text-blue-800 disabled:bg-[#F5F8FF] disabled:text-blue-300",
  SECONDARY_GRAY = "border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:text-gray-800 disabled:border-gray-200 disabled:text-gray-300",
}

export const BUTTON_COLORS: Record<TVariant, ButtonColors> = {
  link: ButtonColors.LINK,
  primary: ButtonColors.PRIMARY,
  tertiary: ButtonColors.TERTIARY,
  linkGray: ButtonColors.LINK_GRAY,
  secondary: ButtonColors.SECONDARY,
  tertiaryGray: ButtonColors.TERTIARY_GRAY,
  secondaryGray: ButtonColors.SECONDARY_GRAY,
};

export enum ButtonVariant {
  LINK = "border-none !p-0",
  LINK_GRAY = "border-none !p-0",
  PRIMARY = "border-blue-600 hover:border-blue-700 disabled:border-blue-200",
  TERTIARY = "border-transparent hover:border-blue-50",
  TERTIARY_GRAY = "border-transparent",
  SECONDARY = "hover:border-blue-100",
  SECONDARY_GRAY = "",
}
export const BUTTON_VARIANTS: Record<TVariant, string> = {
  link: ButtonVariant.LINK,
  primary: ButtonVariant.PRIMARY,
  tertiary: ButtonVariant.TERTIARY,
  linkGray: ButtonVariant.LINK_GRAY,
  secondary: ButtonVariant.SECONDARY,
  tertiaryGray: ButtonVariant.TERTIARY_GRAY,
  secondaryGray: ButtonVariant.SECONDARY_GRAY,
};

enum ButtonTextAlign {
  Left = "text-left",
  Right = "text-right",
  Center = "text-center",
}
export const BUTTON_TEXT_ALIGN: Record<TButtonTextAlign, ButtonTextAlign> = {
  left: ButtonTextAlign.Left,
  right: ButtonTextAlign.Right,
  center: ButtonTextAlign.Center,
};
