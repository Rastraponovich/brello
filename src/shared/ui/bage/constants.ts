import { BageColor, BageSize } from "./model";

enum Size {
  sm = "py-0.5 px-1.5 gap-1 text-xs",
  md = "py-0.5 px-2.5 gap-1.5 text-sm",
  lg = "py-1 px-3 gap-1.5 text-sm",
}

enum BackgroundColor {
  blue = "bg-blue-50",
}
enum DotColor {
  blue = "bg-blue-500",
}
enum TextColor {
  blue = "text-blue-700",
}

export const BAGE_SIZE_DICT: Record<BageSize, Size> = {
  sm: Size.sm,
  md: Size.md,
  lg: Size.lg,
};

export const BAGE_BG_DICT: Record<BageColor, BackgroundColor> = {
  blue: BackgroundColor.blue,
};
export const BAGE_TEXT_DICT: Record<BageColor, TextColor> = {
  blue: TextColor.blue,
};
export const BAGE_DOT_DICT: Record<BageColor, DotColor> = {
  blue: DotColor.blue,
};
