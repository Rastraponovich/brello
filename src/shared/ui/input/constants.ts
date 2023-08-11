export enum EInputSize {
  SM = "sm",
  MD = "md",
}

export const INPUT_SIZE_DICT: Record<EInputSize, string> = {
  [EInputSize.SM]: "py-2 px-3",
  [EInputSize.MD]: "px-3.5 py-2.5",
};
