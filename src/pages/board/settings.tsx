import { ChangeEventHandler, ReactNode, memo } from "react";
import { Button, IconButton } from "shared/ui/button";
import { Heading } from "shared/ui/heading";
import { Input, inputLib } from "shared/ui/input";
import { Layout } from "widgets/layout";

import { useUnit } from "effector-react";
import {
  $boardInvites,
  $boardName,
  $newEmail,
  addEmailButtonClicked,
  boardNameChanged,
  changedNewEmail,
  deleteEmailButtonClicked,
  deletedBoardButtonClicked,
} from "./model/settings";

export const BoardSettingsPage = () => {
  return (
    <Layout scrollable>
      <section className="container mx-auto my-0 flex flex-col gap-5 px-8 ">
        <PageHeaderContent />
        <PageForm />
      </section>
    </Layout>
  );
};

const PageHeaderContent = () => {
  return (
    <header className="flex flex-col items-center border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
      <div className="flex flex-col justify-start gap-4 text-3xl font-semibold text-gray-900 sm:flex-row sm:items-center">
        <Heading as="h2">Board settings</Heading>
      </div>
    </header>
  );
};

const PageForm = () => {
  const emails = useUnit($boardInvites);
  const [boardName, setBoardName] = useUnit([$boardName, boardNameChanged]);

  const handleDeleteInviteButtonClicked = useUnit(deleteEmailButtonClicked);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    console.log(event.target);
  };

  return (
    <section className="flex flex-col gap-8">
      <form action="" className="flex flex-col gap-5">
        <FormBlock
          title="Name"
          description="This will be displayed in board header."
        >
          <Input
            value={boardName}
            onChange={setBoardName}
            placeholder="enter board name"
          />
        </FormBlock>
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
        <FormBlock
          title="Delete this board"
          description=" Once you delete a board, there is no going back. Please be
          certain."
        >
          <DeleteBoardButton />
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
  );
};

const DeleteBoardButton = () => {
  const deletedButtonClicked = useUnit(deletedBoardButtonClicked);
  return (
    <Button
      variant="primary"
      size="sm"
      type="button"
      destructive
      onClick={deletedButtonClicked}
    >
      Delete this board
    </Button>
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
  const [newEmail, emailChanged] = useUnit([$newEmail, changedNewEmail]);
  const handleAddEmailButtonClicked = useUnit(addEmailButtonClicked);
  return (
    <div className="flex flex-col gap-2.5">
      <Input
        className="w-full"
        placeholder="you@yourcompany.io"
        type="email"
        value={newEmail}
        onChange={emailChanged}
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
  extends Pick<
    inputLib.models.IInputProps,
    "caption" | "placeholder" | "value" | "onChange" | "id"
  > {
  caption?: string;
  onDelete(id: number): void;
}

const EmailRow = memo<EmailRowProps>(
  ({ caption, value, onChange, placeholder, id, onDelete }) => {
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
  },
);
