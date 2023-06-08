import clsx from "clsx";
import {
  MouseEvent,
  MouseEventHandler,
  memo,
  useCallback,
  useState,
} from "react";
import { TaskList, TTask } from "src/entities/task";
import { Button } from "src/shared/ui/button";
import { SpriteIcons } from "src/shared/ui/icon";
import { Input } from "src/shared/ui/input";
interface IStackProps extends Omit<TStack, "id"> {
  onAdd: MouseEventHandler<HTMLButtonElement>;
  onDelete: (id: number) => void;
}
export const Stack = memo<IStackProps>(({ title, tasks, onDelete }) => {
  const [caption, setCaption] = useState(title);
  const [disabled, setDisabled] = useState(true);
  const [isAddToggled, setIsAddToggled] = useState(false);

  return (
    <div
      className={clsx(
        "flex max-h-screen min-h-[500px] flex-col justify-start space-y-4 rounded-2xl border border-gray-200 bg-gray-100 p-4 shadow-sm"
      )}
    >
      <div className="flex items-baseline justify-between px-3">
        <Input
          className="w-full text-left text-xl font-bold text-[#101828] disabled:border-none"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          disabled={disabled}
        />
        <Button caption="edit" onClick={() => setDisabled((prev) => !prev)} />
      </div>
      <div className="overflow-auto">
        <TaskList tasks={tasks} onClick={onDelete} />
      </div>

      <div className="flex flex-col space-y-4">
        {isAddToggled && (
          <Input
            className="rounded-lg border-blue-300 bg-white px-3 py-3.5 text-base font-normal focus:shadow-lg"
            type="text"
          />
        )}
        <div className="mt-2 flex items-center space-x-3 pr-3">
          <Button
            caption="Add card"
            icon="icon-square-plus"
            className="w-full items-center rounded-lg p-2 text-center text-blue-600 hover:bg-blue-600 hover:text-white"
            onClick={() => setIsAddToggled((prev) => !prev)}
          />
          {isAddToggled && (
            <SpriteIcons
              name="icon-X"
              className="h-3 w-3 text-blue-600"
              onClick={() => setIsAddToggled((prev) => !prev)}
            />
          )}
        </div>
      </div>
    </div>
  );
});
Stack.displayName = "Stack";
const STACKS: TStack[] = [
  {
    id: 1,
    title: "pending",
    tasks: [{ id: 4, title: "task4" }],
    color: "bg-slate-500",
  },
  {
    id: 2,
    title: "work",
    tasks: [
      { id: 1, title: "task1" },
      { id: 2, title: "task2" },
    ],
    color: "bg-blue-500",
  },
  {
    id: 3,
    title: "QA",
    tasks: [{ id: 3, title: "task3" }],
    color: "bg-orange-500",
  },
  {
    id: 4,
    title: "done",
    tasks: [{ id: 5, title: "task5" }],
    color: "bg-green-500",
  },
];

type TStack = {
  id: number;
  title: string;
  tasks: TTask[];
  color?: string;
};
export const StackList = () => {
  const [stacks, setStacks] = useState(STACKS);

  const onAdd = useCallback(
    (_: MouseEvent<HTMLButtonElement>, id: TStack["id"]) => {
      const condition = stacks.find((item) => item.id === id);

      if (condition) {
        setStacks((prev) =>
          prev.map((stack) =>
            stack.id === condition.id
              ? {
                  ...stack,
                  tasks: [
                    ...stack.tasks,
                    { id: stack.tasks.length * Math.random(), title: "sdasd" },
                  ],
                }
              : stack
          )
        );
      }
    },
    [stacks]
  );

  const onDelete = useCallback(
    (id: number, stackId: number) => {
      const condition = stacks.find((item) => item.id === stackId);

      if (condition) {
        setStacks((prev) =>
          prev.map((stack) =>
            stack.id === condition.id
              ? {
                  ...stack,
                  tasks: stack.tasks.filter((item) => item.id !== id),
                }
              : stack
          )
        );
      }
    },
    [stacks]
  );

  return (
    <div className="grid w-full  auto-cols-fr grid-flow-col gap-x-2">
      {stacks.map(({ id, ...stack }) => (
        <Stack
          key={id}
          {...stack}
          onAdd={(e) => onAdd(e, id)}
          onDelete={(taskId) => onDelete(taskId, id)}
        />
      ))}
    </div>
  );
};
