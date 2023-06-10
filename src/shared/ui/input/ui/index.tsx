import clsx from "clsx";
import { InputHTMLAttributes, ReactNode, memo } from "react";

interface IBaseInput extends InputHTMLAttributes<HTMLInputElement> {
  foo?: "bar";
}

interface IInputProps extends IBaseInput {
  caption?: string;
}
export const Input = memo<IInputProps>(({ caption, ...props }) => {
  return (
    <InputWrapper caption={caption}>
      <BaseInput {...props} className={clsx(props.className, "px-2")} />
    </InputWrapper>
  );
});

const BaseInput = memo<IBaseInput>((props) => {
  return (
    <input
      {...props}
      data-qa="Input__value"
      className={clsx(
        props.className,
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

interface IInputWrapper {
  children: ReactNode;
  caption?: string;
  className?: string;
}
const InputWrapper = memo<IInputWrapper>(({ children, caption, className }) => {
  return (
    <label
      className={clsx(className, "flex flex-col")}
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
});
