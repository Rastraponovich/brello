import { memo } from "react";
import type { ChangeEventHandler, FormEventHandler } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

interface AddEntityProps {
  editable: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  buttonCaption: string;
}

export const AddEntity = memo<AddEntityProps>(
  ({ editable, onChange, onReset, onSubmit, value, buttonCaption }) => {
    return (
      <form onReset={onReset} onSubmit={onSubmit} className="flex flex-col gap-4 px-4 py-1">
        {editable && <InputArea rows={3} value={value} onChange={onChange} autoFocus={editable} />}
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
  },
);
AddEntity.displayName = "AddEntity";
