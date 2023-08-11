import { createEffect } from "effector";

import { TBoard } from "pages/workspace/boards/lib";

import { WorkSpace } from "entities/workspace/model";

export const __BOARDS__: TBoard[] = [
  { id: 1, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 2, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 3, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 4, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
  { id: 5, title: "Sprint #3 (03.04.2023 - 10.04.2023)" },
];

const __WORKSPACE__: WorkSpace = {
  boards: __BOARDS__,
  name: "Coding in Action",
  description:
    "Coding in action is the ultimate intensive to kickstart any project, startup, or freelance.",
  domain: "brello.io/workspaces/",
  url: "coding-in-action",
};

export const getWorkspaceFx = createEffect<void, WorkSpace>(() => {
  return __WORKSPACE__;
});

export const updateWorkspaceFx = createEffect(() => true);
