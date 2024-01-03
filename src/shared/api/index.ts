import * as auth from "./rest/auth";
import * as board from "./rest/board";
import * as stack from "./rest/stack";
import * as task from "./rest/task";
import * as upload from "./rest/upload";
import * as user from "./rest/user";
import * as workspace from "./rest/workspace";

export const api = {
  auth,
  user,
  task,
  board,
  stack,
  upload,
  workspace,
};
