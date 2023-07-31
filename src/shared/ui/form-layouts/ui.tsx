import { type ReactNode, memo } from "react";

interface FormBlockProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export const FormBlock = ({ title, description, children }: FormBlockProps) => {
  return (
    <div className="grid gap-5 border-b border-gray-200 pb-5 text-sm font-normal text-gray-600 sm:grid-cols-[280px_1fr]">
      {title && <FormBlockHeader title={title} description={description} />}
      <FormBlockBody>{children}</FormBlockBody>
    </div>
  );
};

interface FormBlockHeaderProps {
  title: string;
  description?: string;
}
const FormBlockHeader = memo<FormBlockHeaderProps>(({ title, description }) => {
  return (
    <div className="flex w-full flex-col">
      <h3 className="font-medium text-gray-700">{title}</h3>
      <span>{description}</span>
    </div>
  );
});

interface FormBlockBodyProps {
  children: ReactNode;
}
const FormBlockBody = ({ children }: FormBlockBodyProps) => {
  return (
    <div className="flex w-full max-w-[512px] flex-col gap-4">{children}</div>
  );
};
