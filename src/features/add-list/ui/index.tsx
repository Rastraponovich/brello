import clsx from "clsx";
import { memo } from "react";

import { type IAddListProps } from "../lib";

import { InputArea } from "src/shared/ui/input";
import { Button, CloseXButton } from "src/shared/ui/button";

export const AddList = memo<IAddListProps>(
  ({ editable, onChange, onReset, onSubmit, value, buttonCaption }) => {
    return (
      <form
        onReset={onReset}
        onSubmit={onSubmit}
        className={clsx(
          "flex w-full  flex-col justify-start gap-4 rounded-2xl border border-gray-200 bg-[#FCFCFD]",
          editable && "px-4 py-5 shadow-sm"
        )}
      >
        {editable && (
          <InputArea
            rows={3}
            value={value}
            onChange={onChange}
            autoFocus={editable}
          />
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

          {editable && (
            <CloseXButton size="lg" variant="primary" type="reset" />
          )}
        </div>
      </form>
    );
  }
);
AddList.displayName = "AddList";
