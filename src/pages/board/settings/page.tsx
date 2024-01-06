import { useUnit } from "effector-react";
import { type ChangeEventHandler, FormEventHandler, memo } from "react";

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
      <section className="container mx-auto flex flex-col gap-5 px-8 ">
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

const PageForm = () => {
  const submit = useUnit(sumbitButtonClicked);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    console.log("submit");

    submit();
  };

  return (
    <form id="form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <BoardName />
      <BoardColors />
      <InvitedList />
      <DeleteBoard />
    </form>
  );
};

const InvitedList = () => {
  const emails = useUnit($invites);

  const handleDeleteInviteButtonClicked = useUnit(deleteEmailButtonClicked);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target);
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
          caption="Email address"
          placeholder="you@yourcompany.io"
          value={email}
          id={String(id)}
          onChange={handleChange}
          onDelete={() => handleDeleteInviteButtonClicked(email)}
        />
      ))}

      <AddEmail />
    </FormBlock>
  );
};

const BoardName = () => {
  const [name, onChange] = useUnit([$title, nameChanged]);

  return (
    <FormBlock title="Name" description="This will be displayed in board header.">
      <Input value={name} onValueChange={onChange} placeholder="enter board name" />
    </FormBlock>
  );
};

const DeleteBoardButton = () => {
  const deletedButtonClicked = useUnit(deletedBoardButtonClicked);

  return (
    <Button size="sm" destructive type="button" variant="primary" onClick={deletedButtonClicked}>
      Delete this board
    </Button>
  );
};

const AddEmail = () => {
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
};

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
        icon="common/trash-01"
        variant="secondaryGray"
        onClick={handleClick}
        size="md"
        type="button"
      />
    </div>
  );
});

const DeleteBoard = () => {
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
};

const BoardColors = () => {
  return (
    <FormBlock title="Choose background image or color" bodyClassName="max-w-full overflow-hidden">
      <div className="flex flex-col gap-4">
        <ImagePicker />
        <ColorPicker />
      </div>
    </FormBlock>
  );
};

const ImagePicker = () => {
  const [image, setImage] = useUnit([$bgImage, bgImageChanged]);

  return <ImagePickerBase selectedImage={image} onImageChange={setImage} />;
};

const ColorPicker = () => {
  const [selected, onColorChange] = useUnit([$background, backgroundColorChanged]);

  return <ColorPickerBase selected={selected} onColorChange={onColorChange} />;
};

const FormFooterActions = () => {
  const pending = useUnit($pending);

  return <FormFooterActionsBase pending={pending} />;
};

const Loader = () => {
  const pending = useUnit($pending);

  return <LoaderCircle pending={pending} />;
};

export const PageLoader = () => {
  return (
    <MainLayout scrollable>
      <section className="container mx-auto flex flex-col gap-5 px-8 ">
        <PageHeader divider title="Board settings" />
        <section className="relative flex flex-col gap-5">
          <Loader />
        </section>
      </section>
    </MainLayout>
  );
};
