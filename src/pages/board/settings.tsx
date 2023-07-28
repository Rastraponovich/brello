import { ReactNode, memo } from "react";
import { Button, IconButton } from "src/shared/ui/button";
import { Heading } from "src/shared/ui/heading";
import { Input, inputLib } from "src/shared/ui/input";
import { Layout } from "src/widgets/layout";

export const BoardSettingsPage = () => {
  return (
    <Layout>
      <PageHeaderContent />
    </Layout>
  );
};

const PageHeaderContent = () => {
  return (
    <section className="container mx-auto my-0 flex flex-col gap-5 px-8">
      <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
        <div className="flex flex-col justify-start gap-4 text-3xl font-semibold text-gray-900 sm:flex-row sm:items-center">
          <Heading as="h2">Board settings</Heading>
        </div>
      </header>
      <section className="flex flex-col gap-8">
        <form action="" className="flex flex-col gap-5">
          <FormBlock
            title="Name"
            description="This will be displayed in board header."
          >
            <Input />
          </FormBlock>
          <FormBlock
            title="Invite collaborators"
            description="Invite colleagues on this board."
            bodyClassName="flex flex-col gap-3"
          >
            <EmailRow
              caption="Email address"
              placeholder="you@yourcompany.io"
              value="you@yourcompany.io"
            />
            <EmailRow
              placeholder="you@yourcompany.io"
              value="you@yourcompany.io"
            />

            <AddEmail />
          </FormBlock>
          <FormBlock
            title="Delete this board"
            description=" Once you delete a board, there is no going back. Please be
                certain."
          >
            <Button variant="primary" size="sm" type="button">
              Delete this board
            </Button>
          </FormBlock>
        </form>
        <div className="flex items-center justify-end gap-3">
          <Button type="reset" variant="secondaryGray" size="sm">
            Cancel
          </Button>
          <Button type="submit" size="sm">
            Save
          </Button>
        </div>
      </section>
    </section>
  );
};

interface FormBlockProps {
  children: ReactNode;
  title: string;
  description: string;
  bodyClassName?: string;
}
const FormBlock = memo<FormBlockProps>(
  ({ children, title, description, bodyClassName }) => {
    return (
      <div className="grid grid-cols-[minmax(0,_280px)_1fr] gap-8 border-b pb-5">
        <div className="flex flex-col text-sm font-medium">
          <span className="text-gray-700">{title}</span>
          <span className="font-normal text-gray-600">{description}</span>
        </div>
        <div className={bodyClassName}>{children}</div>
      </div>
    );
  },
);
FormBlock.displayName = "FormBlock";

const AddEmail = () => {
  return (
    <div className="flex flex-col gap-2.5">
      <Input className="w-full" placeholder="you@yourcompany.io" type="email" />
      <Button
        type="button"
        variant="link"
        leftIcon="common/plus"
        className="self-start"
      >
        Add another
      </Button>
    </div>
  );
};

interface EmailRowProps
  extends Pick<
    inputLib.models.IInputProps,
    "caption" | "placeholder" | "value" | "onChange"
  > {
  caption?: string;
}
const EmailRow = memo<EmailRowProps>(
  ({ caption, value, onChange, placeholder }) => {
    return (
      <div className="flex items-end gap-2.5">
        <Input
          size="md"
          type="email"
          value={value}
          caption={caption}
          className="w-full"
          onChange={onChange}
          placeholder={placeholder}
        />
        <IconButton
          icon="common/trash-01"
          variant="secondaryGray"
          size="md"
          type="button"
        />
      </div>
    );
  },
);
