import clsx from "clsx";
import { memo } from "react";
import { CAPTION_POSITION_DICT, ECaptionPosition } from "../lib/helpers";
import { IInputProps, IBaseInput, IInputWrapper } from "../lib/models";

export const Input = memo<IInputProps>(
  ({ caption, captionPosition, className, ...props }) => {
    return (
      <InputWrapper caption={caption} captionPosition={captionPosition}>
        <BaseInput {...props} className={clsx(className, "px-2")} />
      </InputWrapper>
    );
  }
);

const BaseInput = memo<IBaseInput>(({ className, ...props }) => {
  return (
    <input
      {...props}
      data-qa="Input__value"
      className={clsx(
        className,
        "rounded-md border border-blue-300 bg-transparent py-1 text-gray-500 focus:border-blue-500 focus:text-black"
      )}
    />
  );
});

export const InputSearch = memo<IInputProps>(({ caption, ...props }) => {
  return (
    <InputWrapper caption={caption} className="relative justify-center">
      <span className="absolute left-2 top-1/2  h-6 w-6 bg-gray-600"></span>
      <BaseInput className={clsx(props.className, "px-10")} {...props} />
    </InputWrapper>
  );
});

const InputWrapper = memo<IInputWrapper>(
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
          "flex",
          CAPTION_POSITION_DICT[captionPosition]
        )}
        data-qa="Input__container"
      >
        {caption && (
          <span className="self-start" data-qa="Input__caption" title={caption}>
            {caption}
          </span>
        )}
        {children}
      </label>
    );
  }
);
