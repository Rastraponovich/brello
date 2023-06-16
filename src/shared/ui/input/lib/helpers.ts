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
