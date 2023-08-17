import type { TBoard } from "~/pages/board/page/model";

export type WorkspaceMock = {
  name: string;
  url?: string;
  description?: string;
  logo?: string;
  boards: TBoard[];
  domain?: string;
};
