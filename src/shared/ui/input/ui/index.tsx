import clsx from "clsx";
import { memo } from "react";
import {
  CAPTION_POSITION_DICT,
  ECaptionPosition,
  EInputSize,
  INPUT_SIZE_DICT,
} from "../lib/helpers";
import { models } from "../lib";

export const Input = memo<models.IInputProps>(
  ({ caption, captionPosition, className, ...props }) => {
    return (
      <InputWrapper caption={caption} captionPosition={captionPosition}>
        <BaseInput {...props} className={clsx(className)} />
      </InputWrapper>
    );
  }
);

const BaseInput = memo<models.IBaseInput>(
  ({ className, size = EInputSize.MD, ...props }) => {
    return (
      <input
        {...props}
        data-qa="Input__value"
        className={clsx(
          "text-base font-normal focus:text-gray-900",
          "border border-gray-300 focus-visible:border-blue-300 focus-visible:shadow-md focus-visible:ring-4 focus-visible:ring-blue-100",
          "gap-2 rounded-lg  bg-white text-gray-500 shadow-sm placeholder:text-gray-500 ",
          INPUT_SIZE_DICT[size],
          className
        )}
      />
    );
  }
);

export const InputSearch = memo<models.IInputProps>(({ caption, ...props }) => {
  return (
    <InputWrapper caption={caption} className="relative justify-center">
      <SearchIcon className="absolute left-2 h-6 w-6" />
      <BaseInput
        className={clsx(props.className, "pl-9 pr-3")}
        {...props}
        size="sm"
      />
    </InputWrapper>
  );
});

const InputWrapper = memo<models.IInputWrapper>(
  ({
    children,
    caption,
    className,
    captionPosition = ECaptionPosition.Top,
  }) => {
    return (
      <label
        className={clsx(
          className,
          "flex gap-1.5",
          CAPTION_POSITION_DICT[captionPosition]
        )}
        data-qa="Input__container"
      >
        {caption && (
          <span
            className="self-start text-sm text-gray-700"
            data-qa="Input__caption"
            title={caption}
          >
            {caption}
          </span>
        )}
        {children}
      </label>
    );
  }
);

export const InputArea = memo<models.IInputAreaProps>(
  ({ caption, captionPosition, className, ...props }) => {
    return (
      <InputWrapper caption={caption} captionPosition={captionPosition}>
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
          "text-base font-normal focus:text-gray-900",
          "border border-gray-300 focus-visible:border-blue-300 focus-visible:shadow-md focus-visible:ring-4 focus-visible:ring-blue-100",
          "resize-none gap-2 rounded-lg bg-white text-gray-500 shadow-sm placeholder:text-gray-500 ",
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
          className="w-min border-collapse rounded-l-md rounded-r-none"
          placeholder={leftPlaceholder}
          onChange={onChange}
          value={leftValue}
        />
        <BaseInput
          className="w-full border-collapse rounded-l-none rounded-r-md"
          placeholder={rightPlaceholder}
          onChange={onChange}
          value={rightValue}
        />
      </div>
    );
  }
);
BaseInputWeb.displayName = "BaseInputWeb";

export const InputWeb = memo<models.IInputWebProps>(
  ({ caption, captionPosition, leftPlaceholder, rightPlaceholder }) => {
    return (
      <InputWrapper caption={caption} captionPosition={captionPosition}>
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
