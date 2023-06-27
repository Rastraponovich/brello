import { ChangeEventHandler, FormEventHandler } from "react";

export interface IAddListProps {
  editable: boolean;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  onReset: FormEventHandler<HTMLFormElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  value: string;
  buttonCaption: string;
}
