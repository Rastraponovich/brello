import { TBage } from "src/shared/ui/bage/lib";

export type TCard = {
  id: number;
  title: string;
  bages?: TBage[];
  subTitle: string;
  items: unknown[];
  timeStamp?: Date;
  attachments?: number;
};
