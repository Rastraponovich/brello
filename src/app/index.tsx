import { Route, RouterProvider } from "atomic-router-react";

import "app/styles/index.css";

import { NotFoundPage } from "pages/404";
import { AuthOnboarding } from "pages/auth/onboarding";
import { AuthPage } from "pages/auth/signin";
import { BoardPage } from "pages/board/page";
import { BoardSettingsPage } from "pages/board/settings";
import { UserPage } from "pages/user/settings";
import { BoardsPage } from "pages/workspace/boards";
import { OnboardingPage } from "pages/workspace/onboarding";
import { WorkSpaceSettingsPage } from "pages/workspace/settings";

import { router, routes } from "shared/routing";

export const App = () => {
  return (
    <RouterProvider router={router}>
      <Route route={routes.user} view={UserPage} />
      <Route route={routes.home} view={AuthPage} />
      <Route route={routes.board.board} view={BoardPage} />
      <Route route={routes.board.settings} view={BoardSettingsPage} />
      <Route route={routes.auth.login} view={AuthPage} />
      <Route route={routes.auth.onboarding} view={AuthOnboarding} />
      <Route route={routes.workspace.boards} view={BoardsPage} />
      <Route route={routes.workspace.settings} view={WorkSpaceSettingsPage} />
      <Route route={routes.workspace.onboarding} view={OnboardingPage} />
      <Route route={routes.notFountPage} view={NotFoundPage} />
    </RouterProvider>
  );
};
