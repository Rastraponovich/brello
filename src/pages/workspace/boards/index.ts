import { currentRoute } from "./model";
import { BoardsPage } from "./page";

export const WorkspaceBoardsRoute = {
  view: BoardsPage,
  route: currentRoute,
};
