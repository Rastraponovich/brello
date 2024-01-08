import { Dialog, Transition } from "@headlessui/react";
import { useUnit } from "effector-react";
import { Fragment } from "react";

import { Button, IconButton } from "~/shared/ui/button";
import { Input, InputArea } from "~/shared/ui/input";

import {
  $opened,
  $pending,
  $task,
  $taskDescription,
  $taskName,
  taskClosed,
  taskDeleted,
  taskDescriptionChanged,
  taskNameChanged,
  taskSubmitted,
} from "./model";

export const TaskModal = () => {
  const [taskName, opened, task, taskDescription, pending] = useUnit([
    $taskName,
    $opened,
    $task,
    $taskDescription,
    $pending,
  ]);

  const [onTaskNameChanged, submit, close, onDelete, onDescriptionChanged] = useUnit([
    taskNameChanged,
    taskSubmitted,
    taskClosed,
    taskDeleted,
    taskDescriptionChanged,
  ]);

  return (
    <Transition appear show={opened} as={Fragment}>
      <Dialog onClose={close} className="relative z-10" as="aside">
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
              <Dialog.Panel className="flex w-full max-w-3xl transform flex-col overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="flex flex-col gap-4 p-6 pb-0">
                  <div className="flex flex-row-reverse">
                    <IconButton
                      size="lg"
                      onClick={close}
                      variant="linkGray"
                      icon="common/x-close"
                    />
                  </div>

                  <span className="text-lg font-semibold text-gray-900">Edit task</span>
                </div>

                <div className="flex flex-col gap-5 p-6">
                  <Input
                    size="md"
                    caption="Name"
                    value={taskName}
                    disabled={pending}
                    placeholder="task name"
                    onValueChange={onTaskNameChanged}
                  />

                  <hr className="border-b border-b-gray-200" />

                  <InputArea
                    disabled={pending}
                    caption="Description"
                    value={taskDescription}
                    onValueChange={onDescriptionChanged}
                  />

                  {task?.updatedAt && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(task.updatedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 p-6 pt-8">
                  <Button
                    size="md"
                    destructive
                    variant="primary"
                    pending={pending}
                    onClick={onDelete}
                  >
                    Delete
                  </Button>

                  <div className="grow"></div>
                  <Button onClick={close} variant="secondaryGray" size="md" pending={pending}>
                    Cancel
                  </Button>

                  <Button onClick={submit} variant="primary" size="md" pending={pending}>
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
