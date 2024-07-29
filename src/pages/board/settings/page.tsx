import { useUnit } from "effector-react";
import { memo } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { Button, IconButton } from "~/shared/ui/button";
import { ColorPickerBase } from "~/shared/ui/color-picker";
import { FormBlock, FormFooterActions as FormFooterActionsBase } from "~/shared/ui/form-layouts";
import { ImagePickerBase } from "~/shared/ui/image-selector";
import { Input, type InputProps } from "~/shared/ui/input";
import { LoaderCircle } from "~/shared/ui/loader-circle";

import {
  $background,
  $bgImage,
  $email,
  $invites,
  $pending,
  $title,
  addEmailButtonClicked,
  backButtonClicked,
  backgroundColorChanged,
  bgImageChanged,
  deleteEmailButtonClicked,
  deletedBoardButtonClicked,
  emailChanged,
  nameChanged,
  sumbitButtonClicked,
} from "./model";

export const BoardSettingsPage = () => {
  return (
    <MainLayout scrollable>
      <section className="container mx-auto flex flex-col gap-5 px-8">
        <PageHeader divider title="Board settings" />

        <section className="relative flex flex-col gap-5">
          <Loader />

          <PageForm />

          <FormFooterActions />
        </section>
      </section>
    </MainLayout>
  );
};

function PageForm() {
  return (
    <Form>
      <BoardName />

      <BoardColors />

      <InvitedList />

      <DeleteBoard />
    </Form>
  );
}

function Form({ children }: { children: React.ReactNode }) {
  const [submit, reset] = useUnit([sumbitButtonClicked, backButtonClicked]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    submit();
  };

  return (
    <form id="form" className="flex flex-col gap-5" onSubmit={handleSubmit} onReset={reset}>
      {children}
    </form>
  );
}

function InvitedList() {
  const emails = useUnit($invites);

  const handleDeleteInviteButtonClicked = useUnit(deleteEmailButtonClicked);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    console.info(event.target);
  };

  return (
    <FormBlock
      title="Invite collaborators"
      description="Invite colleagues on this board."
      bodyClassName="flex flex-col gap-3"
    >
      {emails.map((email, id) => (
        <EmailRow
          key={id}
          value={email}
          id={String(id)}
          caption="Email address"
          onChange={handleChange}
          placeholder="you@yourcompany.io"
          onDelete={() => handleDeleteInviteButtonClicked(email)}
        />
      ))}

      <AddEmail />
    </FormBlock>
  );
}

function BoardName() {
  const [name, onChange] = useUnit([$title, nameChanged]);

  return (
    <FormBlock title="Name" description="This will be displayed in board header.">
      <Input value={name} onValueChange={onChange} placeholder="enter board name" />
    </FormBlock>
  );
}

function DeleteBoardButton() {
  const deletedButtonClicked = useUnit(deletedBoardButtonClicked);

  return (
    <Button size="sm" destructive type="button" variant="primary" onClick={deletedButtonClicked}>
      Delete this board
    </Button>
  );
}

function AddEmail() {
  const [email, onChange] = useUnit([$email, emailChanged]);

  const handleAddEmailButtonClicked = useUnit(addEmailButtonClicked);

  return (
    <div className="flex flex-col gap-2.5">
      <Input
        type="email"
        value={email}
        className="w-full"
        onValueChange={onChange}
        placeholder="you@yourcompany.io"
      />

      <Button
        type="button"
        variant="link"
        leftIcon="common/plus"
        className="self-start"
        onClick={handleAddEmailButtonClicked}
      >
        Add another
      </Button>
    </div>
  );
}

interface EmailRowProps
  extends Pick<InputProps, "caption" | "placeholder" | "value" | "onChange" | "id"> {
  caption?: string;
  onDelete(id: number): void;
}

const EmailRow = memo<EmailRowProps>(({ caption, value, onChange, placeholder, id, onDelete }) => {
  const handleClick = () => {
    onDelete(Number(id));
  };

  return (
    <div className="flex items-end gap-2.5">
      <Input
        id={id}
        size="md"
        type="email"
        value={value}
        caption={caption}
        className="w-full"
        onChange={onChange}
        placeholder={placeholder}
      />

      <IconButton
        size="md"
        type="button"
        onClick={handleClick}
        icon="common/trash-01"
        variant="secondaryGray"
      />
    </div>
  );
});

function DeleteBoard() {
  return (
    <FormBlock
      title="Delete this board"
      description=" Once you delete a board, there is no going back. Please be
  certain."
      bodyClassName=""
    >
      <DeleteBoardButton />
    </FormBlock>
  );
}

function BoardColors() {
  return (
    <FormBlock title="Choose background image or color" bodyClassName="max-w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        <ImagePicker />

        <ColorPicker />
      </div>
    </FormBlock>
  );
}

function ImagePicker() {
  const [image, setImage] = useUnit([$bgImage, bgImageChanged]);

  return <ImagePickerBase selectedImage={image} onImageChange={setImage} />;
}

function ColorPicker() {
  const [selected, onColorChange] = useUnit([$background, backgroundColorChanged]);

  return <ColorPickerBase selected={selected} onColorChange={onColorChange} />;
}

function FormFooterActions() {
  const pending = useUnit($pending);

  return <FormFooterActionsBase pending={pending} />;
}

function Loader() {
  const pending = useUnit($pending);

  return <LoaderCircle pending={pending} />;
}

export function PageLoader() {
  return (
    <MainLayout scrollable>
      <section className="container mx-auto flex flex-col gap-5 px-8">
        <PageHeader divider title="Board settings" />

        <section className="relative flex flex-col gap-5">
          <Loader />
        </section>
      </section>
    </MainLayout>
  );
}
