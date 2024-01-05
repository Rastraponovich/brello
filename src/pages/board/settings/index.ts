import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { BoardSettingsPage } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: BoardSettingsPage,
    otherwise: BoardSettingsPage,
  }),
  route: currentRoute,
};
