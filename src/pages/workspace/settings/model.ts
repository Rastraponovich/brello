import { attach, combine, createEvent, createStore, sample } from "effector";
import { pending, reset } from "patronum";

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

export const formSubmitted = createEvent();
export const cancelButtonClicked = createEvent();
export const slugChanged = createEvent<string>();
export const nameChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();

const $id = createStore("");

export const $name = createStore("");
export const $slug = createStore("");
export const $description = createStore("");

$name.on(nameChanged, (_, name) => name);
$slug.on(slugChanged, (_, slug) => slug);
$id.on(workspaceGetFx.doneData, (_, workspace) => workspace?.id);
$name.on(workspaceGetFx.doneData, (_, workspace) => workspace?.name);
$description.on(descriptionChanged, (_, description) => description);
$slug.on(workspaceGetFx.doneData, (_, workspace) => workspace?.slug ?? "");
$description.on(workspaceGetFx.doneData, (_, workspace) => workspace?.description ?? "");

//reset stores
reset({
  target: [$slug, $description, $id, $name],
  clock: currentRoute.closed,
});

export const $workspace = combine({
  id: $id,
  slug: $slug,
  name: $name,
  avatarUrl: null,
  description: $description,
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
