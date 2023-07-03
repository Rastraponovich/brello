import { useUnit } from "effector-react";
import { $emailField, $isValid, actions } from "./model";

export const useEmailField = () =>
  useUnit([$emailField, actions.changedEmail, $isValid]);
