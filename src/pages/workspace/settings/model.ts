import { attach, combine, createEvent, createStore, sample } from "effector";

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

export const slugChanged = createEvent<string>();
export const nameChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();

export const cancelButtonClicked = createEvent();

export const $name = createStore<string>("");
export const $description = createStore<string>("");
export const $slug = createStore<string>("");

$name.on(workspaceGetFx.doneData, (_, workspace) => workspace?.name);
$name.on(nameChanged, (_, name) => name);

$description.on(descriptionChanged, (_, description) => description);

$description.on(workspaceGetFx.doneData, (_, workspace) => workspace?.description ?? "");

$slug.on(slugChanged, (_, slug) => slug);
$slug.on(workspaceGetFx.doneData, (_, workspace) => workspace?.slug ?? "");

sample({
  clock: authenticatedRoute.opened,
  target: workspaceGetFx,
});

sample({
  clock: cancelButtonClicked,
  target: controls.back,
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
