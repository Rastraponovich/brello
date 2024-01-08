import { createRouteView } from "atomic-router-react";

import { authenticatedRoute, currentRoute } from "./model";
import { BoardSettingsPage, PageLoader } from "./page";

export default {
  view: createRouteView({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    route: authenticatedRoute,
    view: BoardSettingsPage,
    otherwise: PageLoader,
  }),
  route: currentRoute,
};
