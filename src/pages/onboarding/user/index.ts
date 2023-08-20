import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { OnboardingAuthPage, PageLoader } from "./page";

export default {
  view: createRouteView({
    route: authenticatedRoute,
    view: OnboardingAuthPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
