import cx from "clsx";
import { forwardRef } from "react";

import { Button, CloseXButton } from "~/shared/ui/button";
import { InputArea } from "~/shared/ui/input";

interface ToggledInputProps {
  value: string;
  opened: boolean;
  pending?: boolean;
  className?: string;
  onReset: () => void;
  onSubmit: () => void;
  buttonCaption?: string;
  onChange: (value: string) => void;
}

export const ToggledInput = forwardRef<HTMLTextAreaElement, ToggledInputProps>((props, ref) => {
  const {
    value,
    opened,
    pending,
    onReset,
    onChange,
    onSubmit,
    className,
    buttonCaption = "Add List",
  } = props;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      onReset={onReset}
      onSubmit={handleSubmit}
      className={cx("flex flex-col gap-4", className)}
    >
      {opened && (
        <InputArea
          rows={3}
          ref={ref}
          value={value}
          autoFocus={opened}
          disabled={pending}
          onValueChange={onChange}
        />
      )}

      <div className="flex items-center gap-2">
        <Button
          size="lg"
          type="submit"
          pending={pending}
          disabled={!value && opened}
          leftIcon="common/plus-square"
          className="grow justify-center"
          variant={opened ? "primary" : "tertiary"}
        >
          {buttonCaption}
        </Button>

        {opened && <CloseXButton size="lg" variant="primary" type="reset" />}
      </div>
    </form>
  );
});
