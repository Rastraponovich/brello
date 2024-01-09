import { Dialog, Transition } from "@headlessui/react";
import { useUnit } from "effector-react";
import { Fragment } from "react";

import { Button, IconButton } from "~/shared/ui/button";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Input, InputArea } from "~/shared/ui/input";

import {
  $canSubmit,
  $opened,
  $pending,
  $taskDescription,
  $taskName,
  taskClosed,
  taskDeleted,
  taskDescriptionChanged,
  taskNameChanged,
  taskSubmitted,
} from "./model";

export const TaskModal = () => {
  const [opened, close] = useUnit([$opened, taskClosed]);

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
                  <div className="flex items-start justify-between">
                    <FeaturedIcon
                      size="lg"
                      type="circle"
                      icon="common/zap"
                      variant="lightCircle"
                      className="self-center"
                    />
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
                  <Title />

                  <hr className="border-b border-b-gray-200" />

                  <Description />
                </div>

                <ModalFooter />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const Title = () => {
  const [onTaskNameChanged] = useUnit([taskNameChanged]);
  const [taskName, pending] = useUnit([$taskName, $pending]);

  return (
    <Input
      size="md"
      caption="Name"
      value={taskName}
      disabled={pending}
      placeholder="task name"
      onValueChange={onTaskNameChanged}
    />
  );
};

const Description = () => {
  const [onDescriptionChanged] = useUnit([taskDescriptionChanged]);
  const [taskDescription, pending] = useUnit([$taskDescription, $pending]);

  return (
    <InputArea
      disabled={pending}
      caption="Description"
      value={taskDescription}
      onValueChange={onDescriptionChanged}
    />
  );
};

const ModalFooter = () => {
  const pending = useUnit($pending);

  return (
    <div className="flex items-center justify-between gap-4 p-6 pt-8">
      <DeleteButton pending={pending} />
      <div className="grow"></div>
      <CancelButton pending={pending} />
      <SubmitButton pending={pending} />
    </div>
  );
};

const SubmitButton = ({ pending }: { pending: boolean }) => {
  const [submit, canSubmit] = useUnit([taskSubmitted, $canSubmit]);

  return (
    <Button size="md" onClick={submit} variant="primary" pending={pending} disabled={!canSubmit}>
      Save
    </Button>
  );
};

const DeleteButton = ({ pending }: { pending: boolean }) => {
  const onDelete = useUnit(taskDeleted);

  return (
    <Button size="md" destructive variant="primary" pending={pending} onClick={onDelete}>
      Delete
    </Button>
  );
};

const CancelButton = ({ pending }: { pending: boolean }) => {
  const onClose = useUnit(taskClosed);

  return (
    <Button onClick={onClose} variant="secondaryGray" size="md" pending={pending}>
      Cancel
    </Button>
  );
};
