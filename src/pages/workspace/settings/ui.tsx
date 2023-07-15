import { useUnit } from "effector-react";

import type { FormEventHandler, ReactNode } from "react";

import { cancelButtonClicked } from "./model";

import { Layout } from "src/widgets/layout";
import { Upload } from "src/shared/ui/upload";
import { Button } from "src/shared/ui/button";
import { PageHeader } from "src/widgets/page-header";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";

export const WorkSpaceSettingsPage = () => {
  return (
    <Layout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-auto ">
        <div className="px-4 sm:px-8">
          <PageHeader divider title="Workspace settings" />
        </div>

        <div className="scroll-shadows flex flex-col gap-8  overflow-auto px-4 sm:px-8 ">
          <WorkSpaceSettingsForm />
        </div>
      </section>
    </Layout>
  );
};

const WorkSpaceSettingsForm = () => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) =>
    e.preventDefault();

  const handleCancel = useUnit(cancelButtonClicked);
  return (
    <form
      onReset={handleCancel}
      onSubmit={handleSubmit}
      className="flex flex-col gap-5"
    >
      <FormBlockWrapper>
        <FormBlockHeader>
          <h3 className="font-medium text-gray-700">Name</h3>
          <span>This will be displayed on your profile.</span>
        </FormBlockHeader>
        <FormBlockBody>
          <Input placeholder="Coding in action" />
          <InputWeb
            leftPlaceholder="brello.io/.../"
            rightPlaceholder="coding-in-action"
            // rightValue="coding-in-action"
          />
        </FormBlockBody>
      </FormBlockWrapper>

      <FormBlockWrapper>
        <FormBlockHeader>
          <h3 className="font-medium text-gray-700">Description</h3>
          <span>A quick snapshot of your workspace.</span>
        </FormBlockHeader>
        <FormBlockBody>
          <InputArea placeholder="Coding in action is the ultimate intensive to kickstart any project, startup, or freelance." />
        </FormBlockBody>
      </FormBlockWrapper>

      <WorkspaceUplad />
      <div className="flex items-center justify-end gap-4 border-t border-gray-200 pt-4">
        <Button size="md" variant="secondaryGray" type="reset">
          Cancel
        </Button>
        <Button size="md" variant="primary" type="submit">
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
            <img
              height={32}
              width={142}
              alt="preview-image"
              src="/brand-logo.svg"
            />
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
