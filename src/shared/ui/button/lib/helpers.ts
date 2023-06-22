export enum EButtonTextAlign {
  Center = "center",
  Left = "left",
  Right = "right",
}

export enum EButtonSize {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export enum EButtonTextSize {
  XS = "xs",
  SM = "sm",
  MD = "md",
  LG = "lg",
  XL = "xl",
}

export const TEXT_SIZE_DICT: Record<EButtonTextSize, string> = {
  [EButtonSize.XS]: "text-xs",
  [EButtonSize.SM]: "text-sm",
  [EButtonSize.MD]: "text-base",
  [EButtonSize.LG]: "text-lg",
  [EButtonSize.XL]: "text-xl",
};

export const BUTTON_SIZES_DICT: Record<EButtonSize, string> = {
  [EButtonSize.XS]: "py-2 px-3.5 gap-2",
  [EButtonSize.SM]: "py-2.5 px-4 gap-2",
  [EButtonSize.MD]: "py-2.5 px-4.5 gap-2",
  [EButtonSize.LG]: "py-3 px-5 gap-2",
  [EButtonSize.XL]: "py-4 px-7 gap-3",
};

export enum EButtonVariant {
  DEFAULT = "default",
  PRIMARY = "primary",
  LINK = "link",
}

export const BUTTON_VARIANTS: Record<EButtonVariant, string> = {
  [EButtonVariant.DEFAULT]: "shadow-sm",
  [EButtonVariant.PRIMARY]: "bg-blue-600 text-white shadow-sm",
  [EButtonVariant.LINK]:
    "bg-transparent px-0 py-0 text-blue-700 border-none ronded-none shadow-none",
};
