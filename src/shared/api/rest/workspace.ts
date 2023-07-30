import { createEffect } from "effector";
import { WorkSpace } from "entities/workspace/model";
import { BOARDS } from "pages/workspace/boards/lib";

export const getWorkspaceFx = createEffect<void, WorkSpace>(() => {
  return {
    boards: BOARDS,
    name: "Coding in Action",
    description:
      "Coding in action is the ultimate intensive to kickstart any project, startup, or freelance.",
    domain: "brello.io/workspaces/",
    url: "coding-in-action",
  };
});
