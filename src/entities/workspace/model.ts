import type { TBoard } from "~/pages/board/page/model";

export type WorkSpace = {
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  boards: TBoard[];
  domain?: string;
};
