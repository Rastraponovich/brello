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
              <Dialog.Panel className="flex flex-col w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all">
                <div className="p-6 pb-0 flex flex-col gap-4">
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

                <div className="flex flex-col p-6 gap-5">
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

                  {task?.updated_at && (
                    <div>
                      <p className="text-sm text-gray-500">
                        Last updated: {new Date(task.updated_at).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between p-6 pt-8 gap-4">
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
