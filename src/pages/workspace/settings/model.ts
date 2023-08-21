import { attach, combine, createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

import { api } from "~/shared/api";
import { controls, routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer/model";

export const currentRoute = routes.workspace.settings;

const authenticatedRoute = chainAuthenticated(currentRoute, {
  otherwise: routes.auth.signIn.open,
});

const workspaceGetFx = attach({
  effect: api.workspace.workspaceGetFx,
  source: $viewer,
  mapParams(_, viewer) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return { userId: viewer!.id };
  },
});

const setSlug = createEvent<string>();
const setName = createEvent<string>();
const setDescription = createEvent<string>();

export const workspaceURLChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceDomainChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceDescriptionChanged = createEvent<ChangeEvent<HTMLTextAreaElement>>();

export const cancelButtonClicked = createEvent();

export const $name = createStore<string>("");
export const $description = createStore<string>("");
export const $slug = createStore<string>("");

$name.on(workspaceGetFx.doneData, (_, workspace) => workspace?.name);
$name.on(setName, (_, name) => name);

$description.on(setDescription, (_, description) => description);

$description.on(workspaceGetFx.doneData, (_, workspace) => workspace?.description ?? "");

$slug.on(setSlug, (_, slug) => slug);
$slug.on(workspaceGetFx.doneData, (_, workspace) => workspace?.slug ?? "");

sample({
  clock: authenticatedRoute.opened,
  target: workspaceGetFx,
});

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});

sample({
  clock: workspaceNameChanged,
  fn: (event) => event.target.value,
  target: setName,
});

sample({
  clock: workspaceDescriptionChanged,
  fn: (event) => event.target.value,
  target: setDescription,
});

sample({
  clock: workspaceURLChanged,
  fn: (event) => event.target.value,
  target: setSlug,
});

export const $workspace = combine(
  {
    slug: $slug,
    name: $name,
    description: $description,
  },
  ({ description, slug, name }) => {
    return { description, slug, name };
  },
);
