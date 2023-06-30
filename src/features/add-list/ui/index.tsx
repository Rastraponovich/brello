import clsx from "clsx";
import { memo } from "react";
import { IAddListProps } from "../lib";
import { InputArea } from "src/shared/ui/input";
import { Button, CloseXButton } from "src/shared/ui/button";

export const AddList = memo<IAddListProps>(
  ({ editable, onChange, onReset, onSubmit, value, buttonCaption }) => {
    return (
      <form
        className={clsx(
          "flex w-full max-w-[360px] shrink-0 snap-center snap-normal flex-col gap-4 rounded-2xl border border-gray-200 bg-[#FCFCFD]",
          editable && "px-4 py-5 shadow-sm"
        )}
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
            leftIcon={{ source: "general", icon: "plus-square" }}
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
AddList.displayName = "AddList";
