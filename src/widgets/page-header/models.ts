import type { ChangeEventHandler } from "react";

import type { TUser } from "~/entities/user/lib";

import type { TButtonProps } from "~/shared/ui/button";
import type { HeadingProps } from "~/shared/ui/heading";

export interface IPageHeaderAction
  extends Pick<TButtonProps, "variant" | "size" | "leftIcon" | "rightIcon" | "onClick" | "title"> {
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
  headingAs?: HeadingProps["as"];
  actions?: IPageHeaderAction[];
  heandingClassName?: HeadingProps["className"];
  onSearch?: ChangeEventHandler<HTMLInputElement>;
}
