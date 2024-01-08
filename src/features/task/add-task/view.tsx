import { forwardRef, useCallback } from "react";
import type { FormEvent } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

interface TaskAddBaseProps {
  title: string;
  opened: boolean;
  pending?: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onTitleChange: (value: string) => void;
}

export const TaskAddBase = forwardRef<HTMLTextAreaElement, TaskAddBaseProps>((props, ref) => {
  const { onTitleChange, title, pending, onSubmit, opened, onReset } = props;

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      onSubmit();
    },
    [onSubmit],
  );

  return (
    <form onSubmit={handleSubmit} onReset={onReset} className="flex flex-col gap-4 px-4 py-1">
      {opened && (
        <InputArea
          rows={3}
          ref={ref}
          value={title}
          autoFocus={opened}
          onValueChange={onTitleChange}
        />
      )}

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
