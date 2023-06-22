export enum ECaptionPosition {
  Left = "left",
  Bottom = "bottom",
  Right = "right",
  Top = "top",
}

export const CAPTION_POSITION_DICT: Record<ECaptionPosition, string> = {
  [ECaptionPosition.Bottom]: "flex-col-reverse",
  [ECaptionPosition.Left]: "flex-row",
  [ECaptionPosition.Right]: "flex-row-reverse",
  [ECaptionPosition.Top]: "flex-col",
};

export enum EInputSize {
  SM = "sm",
  MD = "md",
}

export const INPUT_SIZE_DICT: Record<EInputSize, string> = {
  [EInputSize.SM]: "py-2 px-3",
  [EInputSize.MD]: "px-3.5 py-2.5",
};
