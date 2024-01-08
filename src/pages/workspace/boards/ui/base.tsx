import { type ReactNode, memo } from "react";

import { Button, type ButtonBaseProps, type ButtonBaseVariant } from "~/shared/ui/button";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import { Heading } from "~/shared/ui/heading";
import type { IconName } from "~/shared/ui/icon";

interface IAction extends ButtonBaseProps, ButtonBaseVariant {
  caption: string;
}

interface BaseEmptyProps {
  title: string;
  icon?: IconName;
  onClick?(): void;
  subTitle?: string;
  actions?: IAction[];
  children?: ReactNode;
}
export const BaseEmpty = memo<BaseEmptyProps>(({ icon, title, subTitle, actions, onClick }) => {
  return (
    <div className="flex flex-col items-center">
      {icon && (
        <FeaturedIcon size="lg" icon={icon} type="circle" color="primary" variant="outline" />
      )}

      <Heading as="h3" className="font-semibold text-gray-900">
        {title}
      </Heading>

      {subTitle && <p className="text-center text-sm text-gray-600">{subTitle}</p>}

      <div className="mt-6 flex gap-3">
        {actions?.map(({ caption, ...action }, idx) => (
          <Button key={idx} size="md" variant="secondaryGray" {...action}>
            {caption}
          </Button>
        ))}

        <Button size="md" variant="primary" onClick={onClick} leftIcon="common/plus">
          New board
        </Button>
      </div>
    </div>
  );
});

BaseEmpty.displayName = "BaseEmpty";
