export type BageSize = "sm" | "md" | "lg";
export type BageVariant = "standard" | "dot";
export type BageColor = "blue";

export type TBage = {
  id: number;
  caption?: string;
  variant?: BageVariant;
  size?: BageSize;
  color?: BageColor;
};

export interface BageProps extends TBage {
  onClick?(): void;
}
