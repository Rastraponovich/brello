import { useUnit } from "effector-react";
import { type ChangeEventHandler, memo } from "react";

import { MainLayout } from "~/layouts/main-layout";

import { PageHeader } from "~/widgets/page-header";

import { Button, IconButton } from "~/shared/ui/button";
import { ColorPickerBase } from "~/shared/ui/color-picker";
import { FormBlock, FormFooterActions } from "~/shared/ui/form-layouts";
import { Input, type InputProps } from "~/shared/ui/input";

import {
  $background,
  $email,
  $invites,
  $title,
  addEmailButtonClicked,
  backgroundColorChanged,
  deleteEmailButtonClicked,
  deletedBoardButtonClicked,
  emailChanged,
  nameChanged,
} from "./model";

export const BoardSettingsPage = () => {
  return (
    <MainLayout scrollable>
      <section className="container mx-auto my-0 flex flex-col gap-5 px-8 ">
        <PageHeader divider title="Board settings" />
        <PageForm />
        <FormFooterActions />
      </section>
    </MainLayout>
  );
};

const PageForm = () => {
  return (
    <form id="form" className="flex flex-col gap-5">
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
    <FormBlock title="Choose background image or color">
      <ColorPicker />
    </FormBlock>
  );
};

const ColorPicker = () => {
  const [selected, onColorChange] = useUnit([$background, backgroundColorChanged]);

  return <ColorPickerBase selected={selected} onColorChange={onColorChange} />;
};
