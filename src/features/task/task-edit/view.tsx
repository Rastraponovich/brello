import { Dialog, Transition } from "@headlessui/react";
import { useUnit } from "effector-react";
import { Fragment } from "react";

import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

import {
  $opened,
  $task,
  $taskName,
  taskClosed,
  taskDeleted,
  taskNameChanged,
  taskSubmitted,
} from "./model";

export const TaskModal = () => {
  const [taskName, opened, task] = useUnit([$taskName, $opened, $task]);

  const [onTaskNameChanged, submit, close, onDelete] = useUnit([
    taskNameChanged,
    taskSubmitted,
    taskClosed,
    taskDeleted,
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
              <Dialog.Panel className="flex flex-col gap-4 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Input
                  size="md"
                  caption="Title"
                  value={taskName}
                  placeholder="Title"
                  onValueChange={onTaskNameChanged}
                />

                {task?.updated_at && (
                  <div>
                    <p className="text-sm text-gray-500">
                      Last updated: {new Date(task.updated_at).toLocaleString()}
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Button destructive onClick={onDelete} variant="primary" size="md">
                    Delete
                  </Button>
                  <Button destructive onClick={close} variant="primary" size="md">
                    Close
                  </Button>
                  <Button onClick={submit} variant="primary" size="md">
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
