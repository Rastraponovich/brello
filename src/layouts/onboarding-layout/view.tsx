import type { ReactNode } from "react";

import { cx } from "~/shared/lib";
import { FeaturedIcon } from "~/shared/ui/featured-icon";
import type { IconName } from "~/shared/ui/icon";

interface OnboardingLayoutProps {
  icon?: IconName;
  className?: string;
  backgroundImage?: string;
  children: ReactNode;
  scrollable?: boolean;
}

export const OnboardingLayout = ({
  children,
  className,
  backgroundImage,
  icon = "common/user",
}: OnboardingLayoutProps): JSX.Element => {
  return (
    <main
      className={cx(
        "flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[center_-390px] bg-no-repeat  sm:bg-[center_-240px] ",
        className,
        backgroundImage,
      )}
    >
      <section className="container mx-auto my-0 flex w-full grow flex-col overflow-hidden  sm:items-center sm:justify-center">
        <div className="flex max-w-[512px] flex-col gap-12 px-4 pb-4 pt-16 sm:px-0 sm:pb-0 sm:pt-0">
          <FeaturedIcon
            size="xl"
            icon={icon}
            type="square"
            variant="modern"
            className="self-start"
          />
          {children}
        </div>
      </section>
    </main>
  );
};
