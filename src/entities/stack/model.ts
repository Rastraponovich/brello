import type { TUser } from "~/entities/user";

import type { TBage } from "~/shared/ui/bage";

export type TCard = {
  id: number;
  title: string;
  bages?: TBage[];
  subTitle: string;
  users: TUser[];
  timeStamp?: Date;
  attachments?: number;
};

export type TStack = {
  id: number;
  cards: TCard[];
  title?: string;
};
