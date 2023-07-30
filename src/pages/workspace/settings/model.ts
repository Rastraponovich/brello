import { attach, combine, createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";
import { api } from "shared/api";
import { controls, routes } from "shared/routing";

const getWorkspaceSettingFx = attach({
  effect: api.workspace.getWorkspaceFx,
});

sample({
  clock: routes.workspace.settings.opened,
  target: getWorkspaceSettingFx,
});

const setWorkspaceName = createEvent<string>();
export const $workspaceName = createStore<string>("")
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.name)
  .on(setWorkspaceName, (_, name) => name);

const setWorkspaceDescription = createEvent<string>();
export const $workspaceDescription = createStore<string>("")
  .on(setWorkspaceDescription, (_, description) => description)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.description);

const setWorkspaceURL = createEvent<string>();
export const $workspaceURL = createStore<string>("")
  .on(setWorkspaceURL, (_, url) => url)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.url);

const setWorkspaceDomain = createEvent<string>();
export const $workspaceDomain = createStore<string>("")
  .on(setWorkspaceDomain, (_, domain) => domain)
  .on(getWorkspaceSettingFx.doneData, (_, workspace) => workspace.domain);

export const cancelButtonClicked = createEvent();

sample({
  clock: cancelButtonClicked,
  target: controls.back,
});

export const workspaceNameChanged =
  createEvent<ChangeEvent<HTMLInputElement>>();

sample({
  clock: workspaceNameChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceName,
});

export const workspaceDescriptionChanged =
  createEvent<ChangeEvent<HTMLTextAreaElement>>();

sample({
  clock: workspaceDescriptionChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceDescription,
});

export const workspaceDomainChanged =
  createEvent<ChangeEvent<HTMLInputElement>>();

sample({
  clock: workspaceDomainChanged,
  fn: (event) => event.target.value,
  target: setWorkspaceDomain,
});

export const workspaceURLChanged = createEvent<ChangeEvent<HTMLInputElement>>();

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
