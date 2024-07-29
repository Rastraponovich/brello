import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { useUnit } from "effector-react";
import { Fragment } from "react";

import { Button, IconButton } from "~/shared/ui/button";
import { ColorPickerBase } from "~/shared/ui/color-picker";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Input } from "~/shared/ui/input";

import {
  $boardBackgroundColor,
  $boardName,
  $boardsListPending,
  $modalOpened,
  boardAddSubmitted,
  boardBackgroundColorChanged,
  boardModalClosed,
  boardNameChanged,
} from "../model";

export function BoardCreateDialog() {
  return (
    <ModalWrapper>
      <div className="flex flex-col gap-4 px-6 pt-6">
        <div className="flex items-start justify-between">
          <FeaturedIcon
            size="lg"
            type="circle"
            variant="lightCircle"
            className="self-center"
            icon="common/plus-circle"
          />

          <CloseButton />
        </div>

        <h4 className="text-lg font-semibold text-gray-900">Create a new board</h4>
      </div>

      <BoardCreateForm />

      <DialogActions />
    </ModalWrapper>
  );
}
function ModalWrapper({ children }: { children: React.ReactNode }) {
  const opened = useUnit($modalOpened);
  const [onClose] = useUnit([boardModalClosed]);

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-10" as="aside">
        <TransitionChild
          as={Fragment}
          leaveTo="opacity-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leave="ease-in duration-200"
          enter="ease-out duration-300"
        >
          <div className="fixed inset-0 bg-black/25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              leaveTo="opacity-0 scale-95"
              leave="ease-in duration-200"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
            >
              <DialogPanel className="flex w-full max-w-3xl transform flex-col overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all">
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

function CloseButton() {
  const pending = useUnit($boardsListPending);
  const onClose = useUnit(boardModalClosed);

  return (
    <IconButton
      size="lg"
      onClick={onClose}
      disabled={pending}
      variant="linkGray"
      icon="common/x-close"
    />
  );
}

function BoardCreateForm() {
  return (
    <Form>
      <div className="flex flex-col text-sm">
        <span className="font-medium text-gray-700">Name</span>

        <span className="text-gray-600">This will be displayed in board header.</span>

        <BoardTitle />
      </div>

      <hr className="border-t border-t-gray-200" />

      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-gray-700">Choose background image or color</span>

        <div className="flex flex-col gap-4">
          <ImagePicker />

          <ColorPicker />
        </div>
      </div>
    </Form>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  const [onSubmit, onClose] = useUnit([boardAddSubmitted, boardModalClosed]);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
  };

  const handleReset = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
  };

  return (
    <form
      id="form"
      onReset={handleReset}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 p-6"
    >
      {children}
    </form>
  );
}

function DialogActions() {
  return (
    <div className="flex items-center justify-end gap-3 border-t border-t-gray-200 px-6 pb-6 pt-8">
      <ResetButton />

      <SubmitButton />
    </div>
  );
}

function SubmitButton() {
  const [name, pending] = useUnit([$boardName, $boardsListPending]);

  return (
    <Button
      size="md"
      form="form"
      type="submit"
      variant="primary"
      disabled={pending || name.length === 0}
    >
      Save
    </Button>
  );
}

function ResetButton() {
  const pending = useUnit($boardsListPending);

  return (
    <Button variant="secondaryGray" size="md" type="reset" disabled={pending} form="form">
      Close
    </Button>
  );
}

function BoardTitle() {
  const name = useUnit($boardName);
  const onTitleChange = useUnit(boardNameChanged);

  return (
    <Input
      size="md"
      value={name}
      className="mt-5"
      onValueChange={onTitleChange}
      placeholder="enter the title of your board"
    />
  );
}

function ColorPicker() {
  const [selected, onColorChange] = useUnit([$boardBackgroundColor, boardBackgroundColorChanged]);

  return <ColorPickerBase selected={selected} onColorChange={onColorChange} />;
}

function ImagePicker() {
  return (
    <div className="grid grid-cols-4">
      <ImagePickerItem />

      <ImagePickerItem />

      <ImagePickerItem />

      <ImagePickerItem />
    </div>
  );
}

// ring-[3px] ring-primary-600

function ImagePickerItem() {
  return (
    <div className="flex aspect-square size-44 shrink-0 flex-col rounded-3xl p-1.5">
      <div className="grow rounded-3xl bg-gray-400" />
    </div>
  );
}
