import clsx from "clsx";
import { forwardRef, memo } from "react";

import { type models, helpers } from "./lib";

import { Icon } from "shared/ui/icon";

const _Input = forwardRef<HTMLInputElement, models.IInputProps>(
  ({ caption, className, hint, hasError, errors, ...props }, ref) => {
    return (
      <InputWrapper
        caption={caption}
        hint={hint}
        hasError={hasError}
        errors={errors}
      >
        <BaseInput {...props} className={className} ref={ref} />
      </InputWrapper>
    );
  },
);
export const Input = memo(_Input);
Input.displayName = "Input";

const _BaseInput = forwardRef<HTMLInputElement, models.IBaseInput>(
  ({ className, size = helpers.EInputSize.MD, ...props }, ref) => {
    return (
      <input
        ref={ref}
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
          className,
        )}
      />
    );
  },
);
const BaseInput = memo(_BaseInput);
BaseInput.displayName = "BaseInput";

const _InputSearch = forwardRef<HTMLInputElement, models.IInputProps>(
  ({ caption, hint, ...props }, ref) => {
    return (
      <InputWrapper
        hint={hint}
        caption={caption}
        className="relative justify-center"
      >
        <Icon
          size="normal"
          name="common/search-sm"
          className="absolute left-3.5 h-5 w-5 "
        />
        <BaseInput
          ref={ref}
          size="sm"
          className={clsx(props.className, "pl-10 pr-3.5")}
          {...props}
        />
      </InputWrapper>
    );
  },
);
export const InputSearch = memo(_InputSearch);
InputSearch.displayName = "InputSearch";

const InputWrapper = memo<models.IInputWrapper>(
  ({ children, caption, className, hint, hasError, errors }) => {
    return (
      <label
        data-qa="Input__container"
        className={clsx(
          "flex flex-col gap-1.5 text-left text-sm font-normal",
          className,
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
        {hasError &&
          errors &&
          errors.map((error, id) => (
            <div className="flex flex-col gap-1" key={id}>
              <span
                key={error.text}
                title={error.text}
                data-qa="Input__hint"
                className={clsx(
                  error.type === "invalid" ? "text-rose-500" : "text-gray-600",
                )}
              >
                {error.text}
              </span>
            </div>
          ))}
        {hasError && hint && (
          <span
            title={hint?.text}
            data-qa="Input__hint"
            className={clsx(
              hint.type === "invalid" ? "text-rose-500" : "text-gray-600",
            )}
          >
            {hint?.text}
          </span>
        )}
      </label>
    );
  },
);

const _InputArea = forwardRef<HTMLTextAreaElement, models.IInputAreaProps>(
  ({ caption, className, hint, ...props }, ref) => {
    return (
      <InputWrapper caption={caption} hint={hint}>
        <BaseInputArea {...props} className={clsx(className)} ref={ref} />
      </InputWrapper>
    );
  },
);

export const InputArea = memo(_InputArea);
InputArea.displayName = "InputArea";

const _BaseInutArea = forwardRef<HTMLTextAreaElement, models.IBaseInputArea>(
  ({ rows = 5, className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
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
          className,
        )}
      />
    );
  },
);

const BaseInputArea = memo(_BaseInutArea);
BaseInputArea.displayName = "BaseInputArea";

const _BaseInputWeb = forwardRef<HTMLInputElement, models.IBaseInputWeb>(
  (
    { onChange, leftValue, rightValue, leftPlaceholder, rightPlaceholder },
    ref,
  ) => {
    return (
      <div className="flex" data-qa="InputWeb__block">
        <BaseInput
          readOnly
          tabIndex={-1}
          value={leftValue}
          onChange={onChange}
          placeholder={leftPlaceholder}
          className="w-min max-w-[110px] rounded-l-md rounded-r-none border-r-transparent placeholder:truncate"
        />
        <BaseInput
          ref={ref}
          value={rightValue}
          onChange={onChange}
          placeholder={rightPlaceholder}
          className="w-full border-collapse rounded-l-none rounded-r-md"
        />
      </div>
    );
  },
);
const BaseInputWeb = memo(_BaseInputWeb);
BaseInputWeb.displayName = "BaseInputWeb";

const _InputWeb = forwardRef<HTMLInputElement, models.IInputWebProps>(
  ({ caption, hint, leftPlaceholder, rightPlaceholder }, ref) => {
    return (
      <InputWrapper caption={caption} hint={hint}>
        <BaseInputWeb
          ref={ref}
          leftPlaceholder={leftPlaceholder}
          rightPlaceholder={rightPlaceholder}
        />
      </InputWrapper>
    );
  },
);

export const InputWeb = memo(_InputWeb);
InputWeb.displayName = "InputWeb";
