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

export function BoardAddModal() {
  const [opened, name, pending] = useUnit([$modalOpened, $boardName, $boardsListPending]);
  const [onTitleChange, onClose, onSubmit] = useUnit([
    boardNameChanged,
    boardModalClosed,
    boardAddSubmitted,
  ]);

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
                <div className="flex flex-col gap-4 px-6 pt-6">
                  <div className="flex items-start justify-between">
                    <FeaturedIcon
                      size="lg"
                      type="circle"
                      variant="lightCircle"
                      className="self-center"
                      icon="common/plus-circle"
                    />

                    <IconButton
                      size="lg"
                      onClick={onClose}
                      disabled={pending}
                      variant="linkGray"
                      icon="common/x-close"
                    />
                  </div>

                  <h4 className="text-lg font-semibold text-gray-900">Create a new board</h4>
                </div>

                <div className="flex flex-col gap-5 p-6">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-700">Name</span>

                    <span className="text-sm text-gray-600">
                      This will be displayed in board header.
                    </span>

                    <Input
                      size="md"
                      value={name}
                      className="mt-5"
                      onValueChange={onTitleChange}
                      placeholder="enter the title of your board"
                    />
                  </div>

                  <hr className="border-t border-t-gray-200" />

                  <div className="flex flex-col gap-3">
                    <span>Choose background image or color</span>

                    <div className="flex flex-col gap-4">
                      <ImagePicker />

                      <ColorPicker />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 border-t border-t-gray-200 px-6 pb-6 pt-8">
                  <Button
                    onClick={onClose}
                    variant="secondaryGray"
                    size="md"
                    type="button"
                    disabled={pending}
                  >
                    Close
                  </Button>

                  <Button
                    size="md"
                    type="button"
                    variant="primary"
                    onClick={onSubmit}
                    disabled={pending || name.length === 0}
                  >
                    Save
                  </Button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
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

function ImagePickerItem() {
  return (
    <div className="flex h-44 flex-col rounded-3xl p-1.5">
      <div className="grow rounded-3xl bg-gray-400"></div>
    </div>
  );
}
