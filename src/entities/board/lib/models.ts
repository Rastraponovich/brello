import { TUser } from "entities/user/lib";
import { bageLib } from "shared/ui/bage";

export type TCard = {
  id: number;
  title: string;
  bages?: bageLib.models.TBage[];
  subTitle: string;
  users: TUser[];
  timeStamp?: Date;
  attachments?: number;
};
