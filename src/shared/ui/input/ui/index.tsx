import clsx from "clsx";
import { memo } from "react";

import { type models, helpers } from "../lib";

import { Icon } from "shared/ui/icon";

export const Input = memo<models.IInputProps>(
  ({ caption, className, hint, ...props }) => {
    return (
      <InputWrapper caption={caption} hint={hint}>
        <BaseInput {...props} className={clsx(className)} />
      </InputWrapper>
    );
  }
);

const BaseInput = memo<models.IBaseInput>(
  ({ className, size = helpers.EInputSize.MD, ...props }) => {
    return (
      <input
        {...props}
        data-qa="Input__value"
        className={clsx(
          "text-base text-gray-900 placeholder:text-gray-500",
          "gap-2 bg-white shadow-sm",
          "border-gray-300, rounded-lg border",
          "focus:shadow-none focus:outline-blue-300 focus:ring-4 focus:ring-blue-100",
          "invalid:focus:outline-red-300 invalid:focus:ring-red-100",
          "read-only:pointer-events-none read-only:focus:outline-none read-only:focus:ring-transparent",
          "disabled:bg-gray-50",
          helpers.INPUT_SIZE_DICT[size],
          className
        )}
      />
    );
  }
);

export const InputSearch = memo<models.IInputProps>(
  ({ caption, hint, ...props }) => {
    return (
      <InputWrapper
        hint={hint}
        caption={caption}
        className="relative justify-center"
      >
        <Icon
          size="normal"
          name="common/search-lg"
          className="absolute left-2 h-5 w-5"
        />
        <BaseInput
          size="sm"
          className={clsx(props.className, "pl-9 pr-3")}
          {...props}
        />
      </InputWrapper>
    );
  }
);

const InputWrapper = memo<models.IInputWrapper>(
  ({ children, caption, className, hint }) => {
    return (
      <label
        data-qa="Input__container"
        className={clsx(
          "flex flex-col gap-1.5 text-left text-sm font-normal",
          className
        )}
      >
        {caption && (
          <span
            title={caption}
            data-qa="Input__caption"
            className="font-medium text-gray-700"
          >
            {caption}
          </span>
        )}
        {children}
        {hint && (
          <span
            title={hint?.text}
            data-qa="Input__hint"
            className={clsx(
              hint.type === "invalid" ? "text-rose-500" : "text-gray-600"
            )}
          >
            {hint?.text}
          </span>
        )}
      </label>
    );
  }
);

export const InputArea = memo<models.IInputAreaProps>(
  ({ caption, className, hint, ...props }) => {
    return (
      <InputWrapper caption={caption} hint={hint}>
        <BaseInputArea {...props} className={clsx(className)} />
      </InputWrapper>
    );
  }
);
InputArea.displayName = "InputArea";

const BaseInputArea = memo<models.IBaseInputArea>(
  ({ rows = 5, className, ...props }) => {
    return (
      <textarea
        {...props}
        data-qa="Textarea__value"
        rows={rows}
        className={clsx(
          "px-3 py-2 sm:px-3.5 sm:py-2.5",
          "rounded-lg border border-gray-300",
          "resize-none gap-2  bg-white shadow-sm",
          "invalid:focus:outline-red-300 invalid:focus:ring-red-100",
          "text-base font-normal text-gray-500 placeholder:text-gray-500",
          "read-only:pointer-events-none read-only:focus:outline-none read-only:focus:ring-transparent",
          "focus:text-gray-900 focus:shadow-none focus:outline-blue-300 focus:ring-4 focus:ring-blue-100",
          className
        )}
      />
    );
  }
);
BaseInputArea.displayName = "BaseInputArea";

const BaseInputWeb = memo<models.IBaseInputWeb>(
  ({ onChange, leftValue, rightValue, leftPlaceholder, rightPlaceholder }) => {
    return (
      <div className="flex" data-qa="InputWeb__block">
        <BaseInput
          readOnly
          tabIndex={-1}
          value={leftValue}
          onChange={onChange}
          placeholder={leftPlaceholder}
          className="w-min rounded-l-md rounded-r-none border-r-transparent"
        />
        <BaseInput
          value={rightValue}
          onChange={onChange}
          placeholder={rightPlaceholder}
          className="w-full border-collapse rounded-l-none rounded-r-md"
        />
      </div>
    );
  }
);
BaseInputWeb.displayName = "BaseInputWeb";

export const InputWeb = memo<models.IInputWebProps>(
  ({ caption, hint, leftPlaceholder, rightPlaceholder }) => {
    return (
      <InputWrapper caption={caption} hint={hint}>
        <BaseInputWeb
          leftPlaceholder={leftPlaceholder}
          rightPlaceholder={rightPlaceholder}
        />
      </InputWrapper>
    );
  }
);
InputWeb.displayName = "InputWeb";

export const SearchIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="search-sm">
        <path
          id="Icon"
          d="M17.5 17.5L12.5001 12.5M14.1667 8.33333C14.1667 11.555 11.555 14.1667 8.33333 14.1667C5.11167 14.1667 2.5 11.555 2.5 8.33333C2.5 5.11167 5.11167 2.5 8.33333 2.5C11.555 2.5 14.1667 5.11167 14.1667 8.33333Z"
          stroke="#667085"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
