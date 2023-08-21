import { attach, combine, createEvent, createStore, sample } from "effector";
import { pending } from "patronum";

import { api } from "~/shared/api";
import { controls, routes } from "~/shared/routing";
import { $viewer, chainAuthenticated } from "~/shared/viewer/model";

export const currentRoute = routes.workspace.settings;

export const authenticatedRoute = chainAuthenticated(currentRoute, {
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
export const formSubmitted = createEvent();

export const cancelButtonClicked = createEvent();

export const $name = createStore<string>("");
export const $description = createStore<string>("");
export const $slug = createStore<string>("");
const $id = createStore("");

$name.on(workspaceGetFx.doneData, (_, workspace) => workspace?.name);
$name.on(nameChanged, (_, name) => name);

$id.on(workspaceGetFx.doneData, (_, workspace) => workspace?.id);

$description.on(descriptionChanged, (_, description) => description);

$description.on(workspaceGetFx.doneData, (_, workspace) => workspace?.description ?? "");

$slug.on(slugChanged, (_, slug) => slug);
$slug.on(workspaceGetFx.doneData, (_, workspace) => workspace?.slug ?? "");

export const $workspace = combine({
  slug: $slug,
  id: $id,
  name: $name,
  description: $description,
  avatarUrl: null,
  userId: $viewer.map((viewer) => viewer?.id ?? ""),
});

const workspaceUpdateFx = attach({
  effect: api.workspace.workspaceUpdateFx,
  source: $workspace,
  mapParams(_, workspace) {
    return { workspace };
  },
});

export const $pending = pending({
  effects: [workspaceUpdateFx, workspaceGetFx],
  of: "some",
});

sample({
  clock: authenticatedRoute.opened,
  target: workspaceGetFx,
});

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});

sample({
  clock: formSubmitted,
  target: workspaceUpdateFx,
});
