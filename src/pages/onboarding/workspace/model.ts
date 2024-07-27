import { attach, combine, createEvent, createStore, restore, sample } from "effector";
import { and, not, pending, reset } from "patronum";

import { api } from "~/shared/api";
import { InternalError } from "~/shared/api/client";
import { routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer/model";

// TODO clean ui events goto native;

const enum ErrorDict {
  UnknownError = "Unknown error, please try again later",
  SlugInvalid = "Slug name is invalid, corrent slug and try again",
  NameInvalid = "Name should be not empty",
  SlugTaken = "That slug is already taken",
}

// type OnboardingWorkspaceError = "UnknownError" | "SlugInvalid" | "NameInvalid" | "SlugTaken";

export const currentRoute = routes.onboarding.workspace;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const workspaceExistFx = attach({
  effect: api.workspace.workspaceExistsFx,
  source: $viewer,
  mapParams(_, viewer) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { userId: viewer!.id };
  },
});

export const formSubmitted = createEvent();

export const nameChanged = createEvent<string>();
export const slugChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();

export const $name = restore(nameChanged, "");
export const $slug = restore(slugChanged, "");
export const $description = restore(descriptionChanged, "");

export const $error = createStore<ErrorDict | null>(null);
export const $nameError = createStore<ErrorDict.NameInvalid | null>(null);
export const $slugError = createStore<ErrorDict.SlugInvalid | ErrorDict.SlugTaken | null>(null);

const $workspace = combine({
  name: $name,
  slug: $slug,
  avatarUrl: null,
  description: $description,
  userId: $viewer.map((viewer) => viewer?.id ?? ""),
});

$slugError.on($error, (_, error) => {
  if (error === ErrorDict.SlugTaken) {
    return ErrorDict.SlugTaken;
  }

  return null;
});

// reset error when data is changed
reset({
  clock: $workspace,
  target: [$error, $slugError, $nameError],
});

const workspaceCreateFx = attach({
  source: { workspace: $workspace },
  effect: api.workspace.workspaceCreateFx,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  mapParams: (_, workspace) => {
    return workspace;
  },
});

export const $pending = pending({
  effects: [workspaceExistFx, workspaceCreateFx],
});

export const $nameValid = combine($name, (name) => name.trim().length > 0);
export const $slugValid = combine($slug, (slug) => slug.trim().length > 0);

// happy path

sample({
  clock: authenticatedRoute.opened,
  target: workspaceExistFx,
});

// if exists workspace redirect to home page temp;
sample({
  clock: workspaceExistFx.doneData,
  filter: (workspaceExist) => !!workspaceExist,
  target: routes.workspace.boards.open,
});

sample({
  clock: formSubmitted,
  filter: and($nameValid, $slugValid),
  target: workspaceCreateFx,
});

sample({
  clock: workspaceCreateFx.doneData,
  fn: (data) => {
    return { id: data?.slug ?? "" };
  },
  target: routes.workspace.boards.open,
});

// unhappy path
sample({
  clock: workspaceCreateFx.failData,
  fn: (error: InternalError | Error): ErrorDict => {
    if (error instanceof Error) {
      return ErrorDict.UnknownError;
    }

    if (error?.code === "unique constraint") return ErrorDict.SlugTaken;
    return ErrorDict.UnknownError;
  },
  target: $error,
});

//errors handlers

sample({
  clock: formSubmitted,
  filter: not($nameValid),
  fn: (): ErrorDict => ErrorDict.NameInvalid,
  target: [$error, $nameError],
});

sample({
  clock: formSubmitted,
  filter: not($slugValid),
  fn: (): ErrorDict => ErrorDict.SlugInvalid,
  target: [$error, $slugError],
});

// clear stores when workspace created
reset({
  clock: currentRoute.closed,
  target: [$description, $name, $slug, $error, $nameError, $slugError],
});
