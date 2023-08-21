import { useUnit } from "effector-react";
import { type FormEventHandler } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { FormBlock, FormFooterActions } from "~/shared/ui/form-layouts";
import { Input, InputArea } from "~/shared/ui/input";
import { Upload } from "~/shared/ui/upload";

import {
  $description,
  $name,
  $pending,
  $slug,
  cancelButtonClicked,
  descriptionChanged,
  formSubmitted,
  nameChanged,
  slugChanged,
} from "./model";

export const PageLoader = () => {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-auto px-4 sm:px-8 ">
        <PageHeader divider title="Workspace settings" />
        <div>...Loading, please wait</div>
      </section>
    </MainLayout>
  );
};

export const WorkSpaceSettingsPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-auto px-4 sm:px-8 ">
        <PageHeader divider title="Workspace settings" />
        <WorkSpaceSettingsForm />
        <FormFooterActions />
      </section>
    </MainLayout>
  );
};

const WorkSpaceSettingsForm = () => {
  const handleSubmit = useUnit(formSubmitted);
  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  const handleCancel = useUnit(cancelButtonClicked);

  return (
    <form
      id="form"
      onReset={handleCancel}
      onSubmit={onSubmit}
      className="scroll-shadows -mx-4 flex flex-col gap-5 overflow-auto px-4"
    >
      <WorkspaceName />
      <WorkspaceDescription />
      <WorkspaceUplad />
    </form>
  );
};

const WorkspaceUplad = () => {
  return (
    <FormBlock title="Logo" description="Update your logo.">
      <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-8">
        <div className="flex w-full max-w-[142px] sm:mt-4">
          <img height={32} width={142} alt="preview-image" src="/brand-logo.svg" />
        </div>
        <Upload />
      </div>
    </FormBlock>
  );
};

const WorkspaceName = () => {
  const pending = useUnit($pending);
  const [name, handleChangeName] = useUnit([$name, nameChanged]);
  const [slug, handleChangeSlug] = useUnit([$slug, slugChanged]);

  return (
    <FormBlock title="Name" description="This will be displayed on your profile.">
      <Input
        value={name}
        onValueChange={handleChangeName}
        placeholder="Coding in action"
        disabled={pending}
      />
      <Input
        value={slug}
        disabled={pending}
        onValueChange={handleChangeSlug}
        placeholder="https://brello.io/workspaces/"
        caption="https://brello.io/workspaces/"
      />
    </FormBlock>
  );
};

const WorkspaceDescription = () => {
  const pending = useUnit($pending);
  const [description, setDescribtion] = useUnit([$description, descriptionChanged]);

  return (
    <FormBlock title="Description" description="A quick snapsot of your workspace.">
      <InputArea
        value={description}
        disabled={pending}
        onValueChange={setDescribtion}
        placeholder="Coding in action is the ultimate intensive to kickstart any project, startup, or freelance."
      />
    </FormBlock>
  );
};
