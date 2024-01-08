import { type EventCallable, type Store, createEvent, createStore, sample } from "effector";
import { not, reset } from "patronum";

export const toggleInputFactory = (
  submit: EventCallable<{ value: string }>,
  $pending: Store<boolean>,
): ToggleInput => {
  const reseted = createEvent();
  const submitClicked = createEvent();
  const valueChanged = createEvent<string>();

  const $value = createStore("");
  const $opened = createStore(false);

  $value.on(valueChanged, (_, value) => value);

  sample({
    clock: submitClicked,
    source: { value: $value },
    filter: $opened,
    target: submit,
  });

  sample({
    clock: submitClicked,
    filter: not($opened),
    fn: () => true,
    target: $opened,
  });

  reset({
    clock: reseted,
    target: [$value, $opened],
  });

  return {
    $value,
    $opened,
    reseted,
    valueChanged,
    submitClicked,

    "@@unitShape": () => ({
      reseted,
      valueChanged,
      submitClicked,
      value: $value,
      opened: $opened,
      pending: $pending,
    }),
  };
};

export type ToggleInput = {
  $value: Store<string>;
  $opened: Store<boolean>;
  reseted: EventCallable<void>;
  valueChanged: EventCallable<string>;
  submitClicked: EventCallable<void>;

  "@@unitShape": () => {
    value: Store<string>;
    opened: Store<boolean>;
    pending: Store<boolean>;
    reseted: EventCallable<void>;
    valueChanged: EventCallable<string>;
    submitClicked: EventCallable<void>;
  };
};

export type ToggleInput2 = {
  value: string;
  reseted(): void;
  opened: boolean;
  pending: boolean;
  submitClicked(): void;
  valueChanged(value: string): void;
};
