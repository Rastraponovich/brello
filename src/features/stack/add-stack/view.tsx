import cx from "clsx";
import { type FormEvent, forwardRef, useCallback } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

interface AddStackBaseProps {
  value: string;
  opened: boolean;
  onReset: () => void;
  onSubmit: () => void;
  onChange: (value: string) => void;
}

export const AddStackBase = forwardRef<HTMLTextAreaElement, AddStackBaseProps>(
  ({ onSubmit, onReset, opened, value, onChange }, ref) => {
    const handleSubmit = useCallback(
      (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubmit();
      },
      [onSubmit],
    );

    return (
      <form
        onReset={onReset}
        onSubmit={handleSubmit}
        className={cx(
          "flex w-full  flex-col justify-start gap-4 rounded-2xl border border-gray-200 bg-[#FCFCFD]",
          opened && "px-4 py-5 shadow-sm",
        )}
      >
        {opened && (
          <InputArea rows={3} value={value} onValueChange={onChange} autoFocus={opened} ref={ref} />
        )}
        <div className="flex items-center gap-2">
          <Button
            size="lg"
            type="submit"
            leftIcon="common/plus-square"
            className=" grow justify-center"
            variant={opened ? "primary" : "tertiary"}
          >
            Add List
          </Button>

          {opened && <CloseXButton size="lg" variant="primary" type="reset" />}
        </div>
      </form>
    );
  },
);
