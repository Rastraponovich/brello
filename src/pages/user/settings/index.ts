import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { UserPage } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: UserPage,
    otherwise: UserPage,
  }),
  route: currentRoute,
};
