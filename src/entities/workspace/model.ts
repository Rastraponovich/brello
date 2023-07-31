import { TBoard } from "pages/workspace/boards/lib";

export type WorkSpace = {
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  boards: TBoard[];
  domain?: string;
};
