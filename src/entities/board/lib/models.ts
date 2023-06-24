export type TBoard = {
  id: number;
  title: string;
  subTitle: string;
  items: unknown[];
  timeStamp?: Date;
};

export interface IAvatarBlockProps {
  items: unknown[];
  size?: "xs" | "sm" | "md";
}
