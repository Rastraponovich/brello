import type { ChangeEventHandler } from "react";

import { TUser } from "~/entities/user";

import type { TButtonProps } from "~/shared/ui/button";
import type { HeadingProps } from "~/shared/ui/heading";

export interface PageHeaderAction
  extends Pick<TButtonProps, "variant" | "size" | "leftIcon" | "rightIcon" | "onClick" | "title"> {
  id: string;
  text?: string;
}

export interface PageHeaderProps {
  title: string;
  avatar?: TUser;
  divider?: boolean;
  className?: string;
  searchValue?: string;
  description?: string;
  placeholder?: string;
  headingAs?: HeadingProps["as"];
  actions?: PageHeaderAction[];
  heandingClassName?: HeadingProps["className"];
  onSearch?: ChangeEventHandler<HTMLInputElement>;
}
