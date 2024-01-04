import { useUnit } from "effector-react";
import { memo, useCallback, useEffect, useReducer, useRef, useState } from "react";
import type { FormEvent } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

import { $clear, $pending, taskSubmitted } from "./model";

interface TaskAddProps {
  user_id: string;
  stack_id: string;
}

export const TaskAdd = memo<TaskAddProps>(({ user_id, stack_id }) => {
  const currentId = useRef<string | null>(null);

  const [name, setName] = useState("");

  const [opened, setOpened] = useReducer((opened) => !opened, false);

  const submitted = useUnit(taskSubmitted);
  const [pending, clear] = useUnit([$pending, $clear]);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (opened) {
        currentId.current = user_id;
        return submitted({
          user_id,
          stack_id,
          title: name,
        });
      }

      setOpened();
    },
    [name, opened, stack_id, submitted, user_id],
  );

  useEffect(() => {
    if (clear && currentId.current === user_id) {
      setName("");
      setOpened();
    }
  }, [clear, user_id]);

  return (
    <form onSubmit={onSubmit} onReset={setOpened} className="flex flex-col gap-4 px-4 py-1">
      {opened && <InputArea rows={3} value={name} autoFocus={opened} onValueChange={setName} />}

      <div className="flex items-center gap-2">
        <Button
          size="lg"
          type="submit"
          pending={pending}
          leftIcon="common/plus-square"
          className=" grow justify-center"
          variant={opened ? "primary" : "tertiary"}
        >
          Add Card
        </Button>

        {opened && <CloseXButton size="lg" variant="primary" type="reset" />}
      </div>
    </form>
  );
});

TaskAdd.displayName = "TaskAdd";
