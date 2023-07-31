import { createEvent, createStore, sample } from "effector";
import { ChangeEvent } from "react";

type Validator = (value: string | number) => boolean;

interface CreateFormFactory {
  value: string | number;
  validators?: Validator[];
}
export const createFormFactory = <E extends HTMLInputElement>({
  value,
  validators,
}: CreateFormFactory) => {
  const setValue = createEvent<ChangeEvent<E>>();
  const $value = createStore<CreateFormFactory["value"]>(value);

  const $isValid = createStore<boolean>(true);

  sample({
    clock: setValue,
    fn: (event) => event.target.value,
    target: $value,
  });

  sample({
    clock: $value,
    filter: () => !!validators,
    fn: (value) => {
      if (validators) {
        let hasError = false;
        for (let index = 0; index < validators.length; index++) {
          if (hasError) return !hasError;

          hasError = validators[index](value) === false;
        }
      }

      return true;
    },
    target: $isValid,
  });

  return {
    $value,
    setValue,
    $isValid,
  };
};
