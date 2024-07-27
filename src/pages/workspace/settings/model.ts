import { attach, combine, createEvent, createStore, restore, sample } from "effector";
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

const workspaceUploadImageFx = attach({
  effect: api.upload.uploadFileFx,
});

export const formSubmitted = createEvent();
export const imageChanged = createEvent<File>();
export const cancelButtonClicked = createEvent();
export const slugChanged = createEvent<string>();
export const nameChanged = createEvent<string>();
export const descriptionChanged = createEvent<string>();

const $id = createStore("").on(workspaceGetFx.doneData, (_, workspace) => workspace?.id);

export const $name = restore(nameChanged, "").on(
  workspaceGetFx.doneData,
  (_, workspace) => workspace?.name,
);

export const $slug = restore(slugChanged, "").on(
  workspaceGetFx.doneData,
  (_, workspace) => workspace?.slug ?? "",
);

export const $description = restore(descriptionChanged, "").on(
  workspaceGetFx.doneData,
  (_, workspace) => workspace?.description ?? "",
);

export const $imageUrl = restore(workspaceUploadImageFx.doneData, "").on(
  workspaceGetFx.doneData,
  (_, workspace) => workspace?.avatarUrl ?? "",
);

//reset stores
reset({
  target: [$slug, $description, $id, $name],
  clock: currentRoute.closed,
});

export const $workspace = combine({
  id: $id,
  slug: $slug,
  name: $name,
  avatarUrl: $imageUrl,
  description: $description,
  userId: $viewer.map((viewer) => viewer?.id ?? ""),
});

const workspaceUpdateFx = attach({
  effect: api.workspace.workspaceUpdateFx,
  source: $workspace,
  // eslint-disable-next-line
  //@ts-ignore
  mapParams(_, workspace) {
    return { workspace };
  },
});

export const $pending = pending({
  effects: [workspaceUpdateFx, workspaceGetFx, workspaceUploadImageFx],
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

sample({
  clock: imageChanged,
  fn: (file) => ({ file }),
  target: workspaceUploadImageFx,
});
