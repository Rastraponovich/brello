import { FormEventHandler, ReactNode } from "react";
// import { BoardList } from "src/entities/board";
import { Button } from "src/shared/ui/button";
import { Heading } from "src/shared/ui/heading";
import { Logo } from "src/shared/ui/icons/logo";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";
import { Upload } from "src/shared/ui/upload";
import { Layout } from "src/widgets/layout";

export const WorkSpaceSettingsPage = () => {
  return (
    <Layout>
      <section className="flex flex-col gap-8 px-4">
        <Heading as="h2" className="text-2xl font-semibold text-gray-900">
          Workspace settings
        </Heading>
        <WorkSpaceSettingsForm />
      </section>
    </Layout>
  );
};

const WorkSpaceSettingsForm = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
    e.preventDefault();
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <FormBlockWrapper>
        <FormBlockHeader>
          <h3 className="font-medium text-gray-700">Name</h3>
          <span>This will be displayed on your profile.</span>
        </FormBlockHeader>
        <FormBlockBody>
          <Input value="Coding in action" />
          <InputWeb
            leftPlaceholder="brello.io/.../"
            rightPlaceholder="coding-in-action"
            rightValue="coding-in-action"
          />
        </FormBlockBody>
      </FormBlockWrapper>

      <FormBlockWrapper>
        <FormBlockHeader>
          <h3 className="font-medium text-gray-700">Description</h3>
          <span>A quick snapshot of your workspace.</span>
        </FormBlockHeader>
        <FormBlockBody>
          <InputArea value="Coding in action is the ultimate intensive to kickstart any project, startup, or freelance." />
        </FormBlockBody>
      </FormBlockWrapper>

      <WorkspaceUplad />
      <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-4">
        <Button size="md" variant="secondaryGray">
          Cancel
        </Button>
        <Button size="md" variant="primary">
          Save
        </Button>
      </div>
    </form>
  );
};

const WorkspaceUplad = () => {
  return (
    <FormBlockWrapper>
      <FormBlockHeader>
        <h3 className="font-medium text-gray-700">Logo</h3>
        <span>Update your logo.</span>
      </FormBlockHeader>
      <FormBlockBody>
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
          <div className="flex w-full max-w-[142px] sm:mt-4">
            <Logo />
          </div>
          <Upload />
        </div>
      </FormBlockBody>
    </FormBlockWrapper>
  );
};

const FormBlockWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid gap-5 border-b border-gray-200 pb-5 text-sm font-normal text-gray-600 sm:grid-cols-[280px_1fr]">
      {children}
    </div>
  );
};

const FormBlockHeader = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full flex-col">{children}</div>;
};

const FormBlockBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full max-w-[512px] flex-col gap-4">{children}</div>
  );
};
