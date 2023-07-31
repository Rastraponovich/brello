import * as auth from "./rest/auth";
import * as workspace from "./rest/workspace";
import * as user from "./rest/user";
import * as board from "./rest/board";
import * as upload from "./rest/upload";

export const api = {
  auth,
  user,
  board,
  upload,
  workspace,
};
