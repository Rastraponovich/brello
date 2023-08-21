import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { PageLoader, WorkSpaceSettingsPage } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: WorkSpaceSettingsPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
