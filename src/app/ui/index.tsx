import "app/styles/index.css";
import { useEffect } from "react";
import { useUnit } from "effector-react";
import { RouterProvider, Route } from "atomic-router-react";

import { appStarted } from "src/shared/config";
import { routes, router } from "shared/routing";

import { BoardPage } from "src/pages/board";
import { NotFoundPage } from "src/pages/404";
import { UserPage } from "src/pages/user/settings";
import { BoardsPage } from "src/pages/workspace/boards";
import { AuthOnboarding, AuthPage } from "src/pages/auth";
import { OnboardingPage } from "src/pages/workspace/onboarding";
import { WorkSpaceSettingsPage } from "src/pages/workspace/settings";

export const App = () => {
  const starting = useUnit(appStarted);
  useEffect(() => {
    starting();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <RouterProvider router={router}>
      <Route route={routes.boards} view={BoardsPage} />
      <Route route={routes.board} view={BoardPage} />
      <Route route={routes.user} view={UserPage} />
      <Route route={routes.home} view={AuthPage} />
      <Route route={routes.auth.login} view={AuthPage} />
      <Route route={routes.auth.onboarding} view={AuthOnboarding} />
      <Route route={routes.workspace.settings} view={WorkSpaceSettingsPage} />
      <Route route={routes.workspace.onboarding} view={OnboardingPage} />

      <Route route={routes.notFountPage} view={NotFoundPage} />
    </RouterProvider>
  );
};
