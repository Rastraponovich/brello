import { TBage } from "src/shared/ui/bage/lib";

export type TBoard = {
  id: number;
  title: string;
  subTitle: string;
  items: unknown[];
  timeStamp?: Date;
  bages?: TBage[];
  attachments?: number;
};

export interface IAvatarBlockProps {
  items: unknown[];
  size?: "xs" | "sm" | "md";
}
