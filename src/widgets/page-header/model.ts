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
  onReset?: () => void;
  actions?: PageHeaderAction[];
  headingAs?: HeadingProps["as"];
  onSearch?: (searchValue: string) => void;
  heandingClassName?: HeadingProps["className"];
}
