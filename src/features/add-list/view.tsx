import cx from "clsx";
import { useUnit } from "effector-react";
import { type FormEvent, memo, useCallback } from "react";
import type { ChangeEventHandler } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

import { $editable, $stackName, editableToggled, stackAdded, stackNameChanged } from "./model";

export interface AddListProps {
  user_id: string;
  board_id: string;
  buttonCaption: string;
}

export const AddList = memo<AddListProps>(({ buttonCaption, user_id, board_id }) => {
  const taskAdd = useUnit(stackAdded);

  const [name, nameChanged] = useUnit([$stackName, stackNameChanged]);
  const [editable, setEditable] = useUnit([$editable, editableToggled]);

  const handleChange = useCallback<ChangeEventHandler<HTMLTextAreaElement>>(
    (event) => {
      nameChanged(event.target.value);
    },
    [nameChanged],
  );

  const formSubmitted = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!editable) {
        return setEditable();
      }

      taskAdd({ user_id, board_id });
    },
    [board_id, editable, setEditable, taskAdd, user_id],
  );

  return (
    <form
      onSubmit={formSubmitted}
      className={cx(
        "flex w-full  flex-col justify-start gap-4 rounded-2xl border border-gray-200 bg-[#FCFCFD]",
        editable && "px-4 py-5 shadow-sm",
      )}
    >
      {editable && <InputArea rows={3} value={name} onChange={handleChange} autoFocus={editable} />}
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

        {editable && (
          <CloseXButton size="lg" variant="primary" type="button" onClick={setEditable} />
        )}
      </div>
    </form>
  );
});
AddList.displayName = "AddList";
