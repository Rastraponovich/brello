import clsx from "clsx";
import { ReactNode } from "react";
import { FeaturedIcon, TFeaturedIcon } from "src/shared/ui/icons/featured-icon";
import { Header } from "src/widgets/header";

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
    <main className="container mx-auto my-0 flex grow flex-col gap-8 overflow-y-hidden pb-12 pt-8  sm:pb-12 sm:pt-12">
      {children}
    </main>
  );
};
interface IOnboardingLayoutProps extends IBaseLayoutProps {
  className?: string;
  icon?: TFeaturedIcon;
  backgroundImage?: string;
}
export const OnboardingLayout = ({
  children,
  icon = "user",
  className,
  backgroundImage,
}: IOnboardingLayoutProps) => {
  return (
    <main
      className={clsx(
        "flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[center_-390px] bg-no-repeat pt-16 sm:bg-[center_-240px] sm:pt-0",
        className,
        backgroundImage
      )}
    >
      <section className="container mx-auto my-0 flex w-full grow flex-col px-4  sm:items-center sm:justify-center">
        <div className="flex max-w-[512px] flex-col gap-12">
          <FeaturedIcon
            icon={icon}
            type="square"
            variant="modern"
            size="xl"
            className="self-start"
          />
          {children}
        </div>
      </section>
    </main>
  );
};
