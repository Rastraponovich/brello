import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { BoardPage, PageLoader } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: BoardPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
