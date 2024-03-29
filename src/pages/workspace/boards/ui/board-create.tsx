import { Dialog, Transition } from "@headlessui/react";
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

export const BoardAddModal = () => {
  const [opened, name, pending] = useUnit([$modalOpened, $boardName, $boardsListPending]);
  const [onTitleChange, onClose, onSubmit] = useUnit([
    boardNameChanged,
    boardModalClosed,
    boardAddSubmitted,
  ]);

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog onClose={onClose} className="relative z-10" as="aside">
        <Transition.Child
          as={Fragment}
          leaveTo="opacity-0"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leaveFrom="opacity-100"
          leave="ease-in duration-200"
          enter="ease-out duration-300"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              leaveTo="opacity-0 scale-95"
              leave="ease-in duration-200"
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leaveFrom="opacity-100 scale-100"
            >
              <Dialog.Panel className="flex flex-col w-full text-left max-w-3xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
                <div className="px-6 pt-6 flex flex-col gap-4">
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

                  <h4 className="text-gray-900 text-lg font-semibold">Create a new board</h4>
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

                <div className="flex items-center gap-3 justify-end pt-8 border-t border-t-gray-200 px-6 pb-6">
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const ColorPicker = () => {
  const [selected, onColorChange] = useUnit([$boardBackgroundColor, boardBackgroundColorChanged]);

  return <ColorPickerBase selected={selected} onColorChange={onColorChange} />;
};

const ImagePicker = () => {
  return (
    <div className="grid grid-cols-4">
      <ImagePickerItem />
      <ImagePickerItem />
      <ImagePickerItem />
      <ImagePickerItem />
    </div>
  );
};

const ImagePickerItem = () => {
  return (
    <div className="p-1.5 rounded-3xl h-44 flex flex-col">
      <div className="bg-gray-400 grow rounded-3xl"></div>
    </div>
  );
};
