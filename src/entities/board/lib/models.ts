import { TUser } from "src/entities/user/lib";
import { TBage } from "src/shared/ui/bage/lib";

export type TCard = {
  id: number;
  title: string;
  bages?: TBage[];
  subTitle: string;
  users: TUser[];
  timeStamp?: Date;
  attachments?: number;
};
