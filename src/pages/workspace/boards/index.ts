import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { BoardsPage, PageLoader } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: BoardsPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
