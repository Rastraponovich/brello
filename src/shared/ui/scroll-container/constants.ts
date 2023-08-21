import { type ScrollOrientation } from "./model";

export const ORIENTATION_DICT: Record<ScrollOrientation, string> = {
  vertical: "pl-4 pr-1 mr-1",
  horizontal: "",
  both: "",
};
export const ORIENTATION_CONTAINER_DICT: Record<ScrollOrientation, string> = {
  vertical: "pl-4 pr-4 hover:mr-1 hover:pr-1",
  horizontal: "overflow-hidden",
  both: "",
};
