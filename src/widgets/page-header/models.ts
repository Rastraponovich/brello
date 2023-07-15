import type { ChangeEventHandler } from "react";
import type { TUser } from "src/entities/user/lib";
import type { IHeanding } from "src/shared/ui/heading";
import type { TButtonProps } from "src/shared/ui/button/lib/models";

export interface IPageHeaderAction
  extends Pick<
    TButtonProps,
    "variant" | "size" | "leftIcon" | "rightIcon" | "onClick" | "title"
  > {
  id: string;
  text?: string;
}

export interface IPageHeader {
  title: string;
  avatar?: TUser;
  divider?: boolean;
  className?: string;
  searchValue?: string;
  description?: string;
  placeholder?: string;
  headingAs?: IHeanding["as"];
  actions?: IPageHeaderAction[];
  heandingClassName?: IHeanding["className"];
  onSearch?: ChangeEventHandler<HTMLInputElement>;
}
