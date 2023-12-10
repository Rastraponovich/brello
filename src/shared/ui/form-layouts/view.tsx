import { type ReactNode, memo } from "react";

import { Button } from "~/shared/ui/button";

interface FormBlockProps {
  children: ReactNode;
  title?: string;
  description?: string;
  bodyClassName?: string;
}

export const FormBlock = ({ title, description, children, bodyClassName }: FormBlockProps) => {
  return (
    <div className="grid gap-5 border-b border-gray-200 pb-5 text-sm font-normal text-gray-600 sm:grid-cols-[280px_1fr]">
      {title && <FormBlockHeader title={title} description={description} />}
      <FormBlockBody className={bodyClassName}>{children}</FormBlockBody>
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
  className?: string;
}
const FormBlockBody = ({ children, className }: FormBlockBodyProps) => {
  return <div className={className ?? "flex w-full max-w-[512px] flex-col gap-4"}>{children}</div>;
};

interface FormFooterActionsProps {
  form?: string;
  pending?: boolean;
}
export const FormFooterActions = ({ form = "form", pending }: FormFooterActionsProps) => {
  return (
    <footer className="flex items-center justify-end gap-4 ">
      <Button form={form} size="md" variant="secondaryGray" type="reset" pending={pending}>
        Cancel
      </Button>
      <Button form={form} size="md" variant="primary" type="submit" pending={pending}>
        Save
      </Button>
    </footer>
  );
};
