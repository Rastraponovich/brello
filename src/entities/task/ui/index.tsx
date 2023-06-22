import clsx from "clsx";
import { memo } from "react";
import { SpriteIcons } from "src/shared/ui/icon";

interface ITaskProps extends Omit<TTask, "id"> {
  onClick: () => void;
}
export const Task = memo<ITaskProps>(
  ({
    title,
    onClick,
    description = "We’re looking for a mid-level product designer to join our team.",
  }) => {
    return (
      <div
        className=" broder-[#EAECF0] flex flex-col space-y-5 rounded-2xl bg-white p-5 text-left text-lg font-medium text-gray-900"
        onClick={onClick}
      >
        <span>{title}</span>
        <span className="text-base font-normal text-gray-600">
          {description}
        </span>

        <PersonStack />

        <div className="flex space-x-2 text-base font-normal text-gray-600 ">
          <span>cl</span>
          <span className="hover:underline">1 April 2023</span>
        </div>
      </div>
    );
  }
);

Task.displayName = "Task";

interface IPersonStackProps {
  canAdd?: boolean;
  size?: "small" | "normal";
}

type TPerson = {
  id: number;
  name: string;
};
const PersonStack = memo<IPersonStackProps>(({ size = "normal" }) => {
  const persons: TPerson[] = [
    { id: 1, name: "x" },
    { id: 2, name: "z" },
  ];
  return (
    <div className="flex items-center space-x-2">
      <div
        className={clsx(
          "flex text-center text-sm text-gray-600",
          size === "small" ? "-space-x-2" : "-space-x-3"
        )}
      >
        {persons.map((person) => (
          <PersonStackItem person={person} key={person.id} size={size} />
        ))}
        <PersonStackItem
          person={{ id: 9999, name: `+${persons.length}` }}
          size={size}
        />
      </div>
      <div
        className={clsx(
          " flex items-center justify-center rounded-full border border-dashed border-gray-300 bg-white uppercase text-gray-300",
          size === "small" ? "h-8 w-8" : "h-10 w-10"
        )}
      >
        <button
          className={clsx(
            size === "small" ? "h-8 w-8" : "h-10 w-10",
            "flex items-center justify-center rounded-full border border-dashed"
          )}
        >
          <SpriteIcons name="icon-Plus" className="h-2.5 w-2.5 text-gray-400" />
        </button>
      </div>
    </div>
  );
});

PersonStack.displayName = "PersonStack";

interface IPersonStackItem {
  person: TPerson;
  size: "normal" | "small";
}

const PersonStackItem = memo<IPersonStackItem>(({ person, size }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-full border-[1.5px]  border-white bg-gray-200",
        size === "normal" ? "h-10 w-10" : "h-8 w-8"
      )}
    >
      <span> {person.name}</span>
    </div>
  );
});
PersonStackItem.displayName = "PersonStackItem";

export type TTask = {
  id: number;
  title: string;
  description?: string;
};
interface ITaskListProps {
  tasks: TTask[];
  onClick: (id: TTask["id"]) => void;
}
export const TaskList = memo<ITaskListProps>(({ tasks, onClick }) => {
  return (
    <div className="flex flex-col space-y-4 overflow-clip">
      {tasks.map(({ id, ...task }) => (
        <Task key={id} {...task} onClick={() => onClick(id)} />
      ))}
    </div>
  );
});

TaskList.displayName = "TaskList";
