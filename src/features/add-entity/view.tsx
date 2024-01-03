import { useUnit } from "effector-react";
import { memo, useCallback } from "react";
import type { FormEvent } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

import { $editable, $taskName, editableToggled, taskNameChanged, taskSubmitted } from "./model";

interface AddEntityProps {
  user_id: string;
  stack_id: string;
  buttonCaption: string;
}

export const AddEntity = memo<AddEntityProps>(({ buttonCaption, user_id, stack_id }) => {
  const [taskName, onChange] = useUnit([$taskName, taskNameChanged]);
  const [editable, setEditable] = useUnit([$editable, editableToggled]);
  const [submitted] = useUnit([taskSubmitted]);

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (editable) {
        return submitted({
          user_id,
          stack_id,
        });
      }

      setEditable();
    },
    [editable, setEditable, stack_id, submitted, user_id],
  );

  return (
    <form onReset={setEditable} onSubmit={onSubmit} className="flex flex-col gap-4 px-4 py-1">
      {editable && (
        <InputArea rows={3} value={taskName} onValueChange={onChange} autoFocus={editable} />
      )}
      <div className="flex items-center gap-2">
        <Button
          size="lg"
          type="submit"
          leftIcon="common/plus-square"
          className=" grow justify-center"
          variant={editable ? "primary" : "tertiary"}
        >
          {buttonCaption}
        </Button>

        {editable && <CloseXButton size="lg" variant="primary" type="reset" />}
      </div>
    </form>
  );
});

AddEntity.displayName = "AddEntity";
