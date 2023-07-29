import clsx from "clsx";
import { ReactNode } from "react";

import { Header } from "widgets/header";
import { IconName } from "shared/ui/icon";
import { FeaturedIcon } from "shared/ui/icons/featured-icon";

interface ILayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <BaseLayout>{children}</BaseLayout>
    </>
  );
};
interface IBaseLayoutProps {
  children: ReactNode;
}
export const BaseLayout = ({ children }: IBaseLayoutProps) => {
  return (
    <main className="flex grow flex-col gap-8 overflow-y-hidden pb-12 pt-8  sm:pb-12 sm:pt-12">
      {children}
    </main>
  );
};
interface IOnboardingLayoutProps extends IBaseLayoutProps {
  icon?: IconName;
  className?: string;
  backgroundImage?: string;
}
export const OnboardingLayout = ({
  children,
  className,
  backgroundImage,
  icon = "common/user",
}: IOnboardingLayoutProps) => {
  return (
    <main
      className={clsx(
        "flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[center_-390px] bg-no-repeat  sm:bg-[center_-240px] ",
        className,
        backgroundImage,
      )}
    >
      <section className="container mx-auto my-0 flex w-full grow flex-col overflow-hidden  sm:items-center sm:justify-center">
        <div className="flex max-w-[512px] flex-col gap-12 overflow-auto px-4 pb-4 pt-16 sm:px-0 sm:pb-0 sm:pt-0">
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
