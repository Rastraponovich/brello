export type TSize = "sm" | "md" | "lg";
export type TVariant = "standard" | "dot";
export type TColor = "blue";

export type TBage = {
  id: number;
  caption?: string;
  variant?: TVariant;
  size?: TSize;
  color?: TColor;
};

export interface IBageProps extends TBage {
  onClick?(): void;
}
