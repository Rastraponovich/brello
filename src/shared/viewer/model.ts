import { User } from "@supabase/supabase-js";
import { RouteInstance, RouteParams, RouteParamsAndQuery, chainRoute } from "atomic-router";
import { Effect, Event, attach, createEvent, createStore, sample } from "effector";

import { api } from "../api";

interface ChainParams {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  otherwise?: Event<void> | Effect<void, any, any>;
}

enum ViewerStatus {
  Initial = 0,
  Pending,
  Authenticated,
  Anonymous,
}

export const viewerGetFx = attach({
  effect: api.auth.getMeFx,
});

export const $viewer = createStore<User | null>(null);
const $viewerStatus = createStore<ViewerStatus>(ViewerStatus.Initial);

$viewer.on(viewerGetFx.doneData, (_, user) => user);

$viewerStatus.on(viewerGetFx.doneData, (_, user) => {
  if (user) return ViewerStatus.Authenticated;
  return ViewerStatus.Anonymous;
});

$viewerStatus.on(viewerGetFx.failData, (status, error) => {
  if (error.status === 401 || error.status === 403) {
    return ViewerStatus.Anonymous;
  }

  if (status === ViewerStatus.Pending) {
    return ViewerStatus.Anonymous;
  }

  return status;
});

export function chainAuthenticated<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {},
) {
  const authenticationCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const userAutenticated = createEvent();
  const userAnonymous = createEvent();

  /* when first time we open page */
  sample({
    clock: authenticationCheckStarted,
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Initial,
    target: viewerGetFx,
  });

  /* when user status is authenticated */
  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Authenticated,
    target: userAutenticated,
  });

  /* when user status is anonymous or fail */
  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done, viewerGetFx.fail],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Anonymous,
    target: userAnonymous,
  });

  /* side effect */
  if (otherwise) {
    sample({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      clock: userAnonymous,
      filter: route.$isOpened,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authenticationCheckStarted,
    openOn: [userAutenticated],
    cancelOn: [userAnonymous],
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {},
) {
  const authenticationCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const userAutenticated = createEvent();
  const userAnonymous = createEvent();

  /* when first time we open page */
  sample({
    clock: authenticationCheckStarted,
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Initial,
    target: viewerGetFx,
  });

  /* when user status is authenticated */
  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Authenticated,
    target: userAutenticated,
  });

  /* when user status is anonymous or fail */
  sample({
    clock: [authenticationCheckStarted, viewerGetFx.done, viewerGetFx.fail],
    source: $viewerStatus,
    filter: (status) => status === ViewerStatus.Anonymous,
    target: userAnonymous,
  });

  /* side effect */
  if (otherwise) {
    sample({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      clock: userAutenticated,
      filter: route.$isOpened,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: authenticationCheckStarted,
    openOn: [userAnonymous],
    cancelOn: [userAutenticated],
  });
}
