import { createRoutesView } from "atomic-router-react";

import { FinishRoute } from "./auth/finish";
import { AuthSignInRoute } from "./auth/signin";
import { BoardPageRoute } from "./board/page";
import { BoardSettingsRoute } from "./board/settings";
import { HomeRoute } from "./home";
import { NotFoundRoute } from "./not-found-page";
import { OnboardingAuthRoute } from "./onboarding/user";
import { OnboardingWorkspaceRoute } from "./onboarding/workspace";
import { UserPageRoute } from "./user/settings";
import { WorkspaceBoardsRoute } from "./workspace/boards";
import { WorkspaceSettingsRoute } from "./workspace/settings";

export const RoutesView = createRoutesView({
  routes: [
    AuthSignInRoute,
    BoardPageRoute,
    BoardSettingsRoute,
    WorkspaceBoardsRoute,
    WorkspaceSettingsRoute,
    OnboardingAuthRoute,
    OnboardingWorkspaceRoute,
    UserPageRoute,
    NotFoundRoute,
    HomeRoute,
    FinishRoute,
  ],
});
