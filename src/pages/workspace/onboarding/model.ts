import { attach, combine, createEvent, createStore, sample } from "effector";
import type { ChangeEvent, FormEvent } from "react";

import { inputReducer } from "./utils";

export const formSubmitted = createEvent<FormEvent<HTMLFormElement>>();
export const nameChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const urlChanged = createEvent<ChangeEvent<HTMLInputElement>>();
export const descriptionChanged = createEvent<ChangeEvent<HTMLTextAreaElement>>();

export const $name = createStore<string | null>(null);
export const $url = createStore<string | null>(null);
export const $description = createStore<string | null>(null);

/**
 * @todo FIX dirty
 */
formSubmitted.watch((event) => event.preventDefault);

$name.on(nameChanged, inputReducer);
$url.on(urlChanged, inputReducer);
$description.on(descriptionChanged, inputReducer);

const $workspace = combine($name, $url, $description, (name, url, description) => {
  return { name, url, description };
});

const formSendFx = attach({
  source: $workspace,
  async effect() {
    return true;
  },
});

sample({
  clock: formSubmitted,
  target: formSendFx,
});
