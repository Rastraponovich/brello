import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { OnboardingWorkspacePage, PageLoader } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: OnboardingWorkspacePage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
