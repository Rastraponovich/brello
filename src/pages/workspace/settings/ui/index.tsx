import { FormEventHandler, ReactNode } from "react";
import { BoardList } from "src/entities/board";
import { Button } from "src/shared/ui/button";
import { Logo } from "src/shared/ui/icons/logo";
import { Input, InputArea, InputWeb } from "src/shared/ui/input";
import { Upload } from "src/shared/ui/upload";
import { Header } from "src/widgets/header";

export const WorkSpaceSettingsPage = () => {
  return (
    <div className="flex flex-col ">
      <Header />
      <main className="container mx-auto my-0 flex flex-col">
        <BoardList />
        <section className="flex flex-col gap-8 px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Workspace settings
          </h2>
          <WorkSpaceSettingsForm />
        </section>
      </main>
    </div>
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
      <div className="flex items-center justify-end gap-4">
        <Button size="md">Cancel</Button>
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
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Logo />
          <Upload />
        </div>
      </FormBlockBody>
    </FormBlockWrapper>
  );
};

const FormBlockWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col gap-5 border-b border-gray-200 pb-5 text-sm font-normal text-gray-600 sm:flex-row">
      {children}
    </div>
  );
};

const FormBlockHeader = ({ children }: { children: ReactNode }) => {
  return <div className="flex w-full max-w-[280px] flex-col">{children}</div>;
};

const FormBlockBody = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full max-w-[512px] flex-col gap-4">{children}</div>
  );
};
