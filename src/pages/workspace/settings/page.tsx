import { useUnit } from "effector-react";
import { type FormEventHandler } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { Button } from "~/shared/ui/button";
import { FormBlock, FormFooterActions as FormFooterActionsBase } from "~/shared/ui/form-layouts";
import { Input, InputArea } from "~/shared/ui/input";
import { LoaderCircle } from "~/shared/ui/loader-circle";

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
        <section className="flex flex-col gap-8 relative">
          <Loader />
        </section>
      </section>
    </MainLayout>
  );
};

export const WorkSpaceSettingsPage = () => {
  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col gap-8 overflow-auto px-4 sm:px-8 ">
        <PageHeader divider title="Workspace settings" />
        <section className="flex flex-col gap-8 relative">
          <Loader />
          <WorkSpaceSettingsForm />
          <FormFooterActions />
        </section>
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
      onSubmit={onSubmit}
      onReset={handleCancel}
      className="scroll-shadows -mx-4 flex flex-col gap-5 overflow-auto px-4"
    >
      <WorkspaceUplad />
      <WorkspaceName />
      <WorkspaceDescription />
    </form>
  );
};

function genTitle(title: string): string {
  const arr = title.split(" ");

  if (arr.length > 1) {
    return `${arr[0].charAt(0).toUpperCase()}${arr[1].charAt(0).toUpperCase()}`;
  }

  if (title.length > 1) {
    return `${title.charAt(0).toUpperCase()}${title.charAt(1).toUpperCase()}`;
  }

  return title.charAt(0).toUpperCase();
}

const WorkspaceUplad = () => {
  const title = useUnit($name);

  return (
    <FormBlock title="Logo" description="Update your logo.">
      <div className="flex sm:items-center gap-5 sm:gap-8">
        <div className="rounded-full bg-gray-100 text-gray-600 h-16 w-16 shrink-0 flex items-center justify-center">
          <span className="text-2xl font-medium">{genTitle(title)}</span>
        </div>

        <div className="flex items-start sm:items-center flex-col sm:flex-row gap-3">
          <div className="flex flex-col text-sm font-normal gap-1">
            <span className="text-gray-600 font-medium">Upload image</span>
            <span className="text-gray-700">SVG, PNG, JPG or GIF (max. 500×500px)</span>
          </div>

          <Button size="sm" variant="secondaryGray">
            Upload
          </Button>
        </div>
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
        disabled={pending}
        placeholder="Coding in action"
        onValueChange={handleChangeName}
      />

      <Input
        value={slug}
        disabled={pending}
        onValueChange={handleChangeSlug}
        caption={`brello.io/workspaces/${slug}`}
        placeholder="https://brello.io/workspaces/"
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
        disabled={pending}
        value={description}
        onValueChange={setDescribtion}
        placeholder="Coding in action is the ultimate intensive to kickstart any project, startup, or freelance."
      />
    </FormBlock>
  );
};

const Loader = () => {
  const pending = useUnit($pending);

  return <LoaderCircle pending={pending} />;
};

const FormFooterActions = () => {
  const pending = useUnit($pending);

  return <FormFooterActionsBase pending={pending} />;
};
