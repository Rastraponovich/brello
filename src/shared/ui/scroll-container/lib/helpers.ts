import { TScrollOrientation } from ".";

export const ORIENTATION_DICT: Record<TScrollOrientation, string> = {
  vertical: "overflow-y-auto overflow-x-hidden pl-4 pr-4 hover:mr-1 hover:pr-1",
  horizontal: "",
  both: "",
};
export const ORIENTATION_CONTAINER_DICT: Record<TScrollOrientation, string> = {
  vertical: "overflow-y-auto overflow-x-hidden pl-4 pr-4 hover:mr-1 hover:pr-1",
  horizontal: "overflow-hidden",
  both: "",
};
