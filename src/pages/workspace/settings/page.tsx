import { useUnit } from "effector-react";
import { type FormEventHandler, useRef } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { Button } from "~/shared/ui/button";
import { FormBlock, FormFooterActions as FormFooterActionsBase } from "~/shared/ui/form-layouts";
import { Input, InputArea } from "~/shared/ui/input";
import { LoaderCircle } from "~/shared/ui/loader-circle";

import {
  $description,
  $imageUrl,
  $name,
  $pending,
  $slug,
  cancelButtonClicked,
  descriptionChanged,
  formSubmitted,
  imageChanged,
  nameChanged,
  slugChanged,
} from "./model";

export function PageLoader() {
  return (
    <MainLayout>
      <section className="container mx-auto my-0 flex flex-col gap-8 overflow-auto px-4 sm:px-8">
        <PageHeader divider title="Workspace settings" />

        <section className="relative flex flex-col gap-8">
          <Loader />
        </section>
      </section>
    </MainLayout>
  );
}

export function WorkSpaceSettingsPage() {
  return (
    <MainLayout>
      <section className="container mx-auto flex flex-col gap-8 overflow-auto px-4 sm:px-8">
        <PageHeader divider title="Workspace settings" />

        <section className="relative flex flex-col gap-8">
          <Loader />

          <WorkSpaceSettingsForm />

          <FormFooterActions />
        </section>
      </section>
    </MainLayout>
  );
}

function WorkSpaceSettingsForm() {
  return (
    <Form>
      <WorkspaceUplad />

      <WorkspaceName />

      <WorkspaceDescription />
    </Form>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  const handleSubmit = useUnit(formSubmitted);

  const handleCancel = useUnit(cancelButtonClicked);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    handleSubmit();
  };

  return (
    <form
      id="form"
      onSubmit={onSubmit}
      onReset={handleCancel}
      className="scroll-shadows -mx-4 flex flex-col gap-5 overflow-auto px-4"
    >
      {children}
    </form>
  );
}

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

function WorkspaceUplad() {
  const upload = useUnit(imageChanged);

  const [title, image] = useUnit([$name, $imageUrl]);

  const uploadRef = useRef<HTMLInputElement>(null);

  const handleUpload: FormEventHandler<HTMLInputElement> = (event) => {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      upload(target.files[0]);
    }
  };

  const handleUploadClick = () => {
    uploadRef.current?.click();
  };

  return (
    <FormBlock title="Logo" description="Update your logo.">
      <div className="flex gap-5 sm:items-center sm:gap-8">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-600">
          {!image ? (
            <span className="text-2xl font-medium">{genTitle(title)}</span>
          ) : (
            <img
              width={64}
              height={64}
              alt={title}
              className="rounded-full object-cover"
              src={`https://ddjirrggtysituolvxws.supabase.co/storage/v1/object/public/avatars/${image}`}
            />
          )}
        </div>

        <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-col gap-1 text-sm font-normal">
            <span className="font-medium text-gray-600">Upload image</span>

            <span className="text-gray-700">SVG, PNG, JPG or GIF (max. 500x500px)</span>
          </div>

          <input
            type="file"
            ref={uploadRef}
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />

          <Button size="sm" variant="secondaryGray" onClick={handleUploadClick} type="button">
            Upload
          </Button>
        </div>
      </div>
    </FormBlock>
  );
}

function WorkspaceName() {
  return (
    <FormBlock title="Name" description="This will be displayed on your profile.">
      <NameField />

      <SlugField />
    </FormBlock>
  );
}
function NameField() {
  const pending = useUnit($pending);
  const [name, handleChangeName] = useUnit([$name, nameChanged]);

  return (
    <Input
      value={name}
      disabled={pending}
      placeholder="Coding in action"
      onValueChange={handleChangeName}
    />
  );
}

function SlugField() {
  const pending = useUnit($pending);

  const [slug, handleChangeSlug] = useUnit([$slug, slugChanged]);

  return (
    <Input
      value={slug}
      disabled={pending}
      onValueChange={handleChangeSlug}
      caption={`brello.io/workspaces/${slug}`}
      placeholder="https://brello.io/workspaces/"
    />
  );
}

function WorkspaceDescription() {
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
}

function Loader() {
  const pending = useUnit($pending);

  return <LoaderCircle pending={pending} />;
}

function FormFooterActions() {
  const pending = useUnit($pending);

  return <FormFooterActionsBase pending={pending} />;
}
