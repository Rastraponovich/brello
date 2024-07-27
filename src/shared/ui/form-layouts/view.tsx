import { memo } from "react";

import { Button } from "~/shared/ui/button";

interface FormBlockProps {
  title?: string;
  description?: string;
  bodyClassName?: string;
  children: React.ReactNode;
}

export function FormBlock(props: FormBlockProps) {
  const { title, description, children, bodyClassName } = props;

  return (
    <div className="grid gap-5 border-b border-gray-200 pb-5 text-sm font-normal text-gray-600 sm:grid-cols-[280px_1fr]">
      {title && <FormBlockHeader title={title} description={description} />}

      <FormBlockBody className={bodyClassName}>{children}</FormBlockBody>
    </div>
  );
}

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
  className?: string;
  children: React.ReactNode;
}

const FormBlockBody = (props: FormBlockBodyProps) => {
  const { children, className } = props;

  return <div className={className ?? "flex w-full max-w-[512px] flex-col gap-4"}>{children}</div>;
};

interface FormFooterActionsProps {
  form?: string;
  pending?: boolean;
}
export function FormFooterActions(props: FormFooterActionsProps) {
  const { form = "form", pending } = props;

  return (
    <footer className="flex items-center justify-end gap-4">
      <Button form={form} size="md" variant="secondaryGray" type="reset" pending={pending}>
        Cancel
      </Button>

      <Button form={form} size="md" variant="primary" type="submit" pending={pending}>
        Save
      </Button>
    </footer>
  );
}
