import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { PageLoader, WorkSpaceSettingsPage } from "./page";

export default {
  route: currentRoute,
  view: createRouteView({
    otherwise: PageLoader,
    route: authenticatedRoute,
    view: WorkSpaceSettingsPage,
  }),
};
