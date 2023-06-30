import { memo } from "react";
import { Button, CloseXButton } from "src/shared/ui/button";
import { InputArea } from "src/shared/ui/input";
import { IAddEntityProps } from "../lib/models";

export const AddEntity = memo<IAddEntityProps>(
  ({ editable, onChange, onReset, onSubmit, value, buttonCaption }) => {
    return (
      <form
        className="flex flex-col gap-4 px-4 py-1"
        onSubmit={onSubmit}
        onReset={onReset}
      >
        {editable && (
          <InputArea
            rows={3}
            autoFocus={editable}
            onChange={onChange}
            value={value}
          />
        )}
        <div className="flex items-center gap-2">
          <Button
            type="submit"
            variant={editable ? "primary" : "tertiary"}
            size="lg"
            leftIcon={{ icon: "plus-square", source: "general" }}
            className=" grow justify-center"
          >
            {buttonCaption}
          </Button>

          {editable && (
            <CloseXButton size="lg" variant="primary" type="reset" />
          )}
        </div>
      </form>
    );
  }
);
AddEntity.displayName = "AddEntity";
