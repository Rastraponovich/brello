import "app/styles/index.css";
import { RouterProvider, Route } from "atomic-router-react";

import { routes, router } from "shared/routing";

import { NotFoundPage } from "pages/404";
import { AuthPage } from "pages/auth/signin";
import { UserPage } from "pages/user/settings";
import { BoardsPage } from "pages/workspace/boards";
import { AuthOnboarding } from "pages/auth/onboarding";
import { BoardPage, BoardSettingsPage } from "pages/board";
import { OnboardingPage } from "pages/workspace/onboarding";
import { WorkSpaceSettingsPage } from "pages/workspace/settings";

export const App = () => {
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
      <Route route={routes.boardSettings} view={BoardSettingsPage} />

      <Route route={routes.notFountPage} view={NotFoundPage} />
    </RouterProvider>
  );
};
