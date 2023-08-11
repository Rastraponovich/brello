import { attach, combine, createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

import { api } from "shared/api";
import { controls, routes } from "shared/routing";

const getWorkspaceSettingFx = attach({
  effect: api.workspace.getWorkspaceFx,
});

const setWorkspaceURL = createEvent<string>();
const setWorkspaceName = createEvent<string>();
const setWorkspaceDomain = createEvent<string>();
const setWorkspaceDescription = createEvent<string>();

export const workspaceURLChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceNameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceDomainChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const workspaceDescriptionChanged = createEvent<ChangeEvent<HTMLTextAreaElement>>();

export const cancelButtonClicked = createEvent();

export const $workspaceName = createStore<string>("")
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.name)
  .on(setWorkspaceName, (_, name) => name);

export const $workspaceDescription = createStore<string>("")
  .on(setWorkspaceDescription, (_, description) => description)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.description);

export const $workspaceURL = createStore<string>("")
  .on(setWorkspaceURL, (_, url) => url)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.url);

export const $workspaceDomain = createStore<string>("")
  .on(setWorkspaceDomain, (_, domain) => domain)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.domain);

sample({
  clock: routes.workspace.settings.opened,
  target: getWorkspaceSettingFx,
});

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});

sample({
  clock: workspaceNameChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceName,
});

sample({
  clock: workspaceDescriptionChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceDescription,
});

sample({
  clock: workspaceDomainChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceDomain,
});

sample({
  clock: workspaceURLChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceURL,
});

export const $workspace = combine(
  {
    url: $workspaceURL,
    name: $workspaceName,
    domain: $workspaceDomain,
    description: $workspaceDescription,
  },
  ({ description, domain, url, name }) => {
    return { description, domain, url, name };
  },
);
