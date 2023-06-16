import { useUnit } from "effector-react";
import { $emailField, $isValid, actions } from ".";

export const useEmailField = () =>
  useUnit([$emailField, actions.changedEmail, $isValid]);
