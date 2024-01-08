import { type ReactNode } from "react";

import { Header } from "~/widgets/header";

import { cx } from "~/shared/lib";

interface LayoutProps {
  className?: string;
  children: ReactNode;
  scrollable?: boolean;
}

export const MainLayout = ({ children, scrollable, className }: LayoutProps) => {
  return (
    <>
      <Header />
      <BaseLayout scrollable={scrollable} className={className}>
        {children}
      </BaseLayout>
    </>
  );
};

interface IBaseLayoutProps {
  className?: string;
  children: ReactNode;
  scrollable?: boolean;
}

export const BaseLayout = ({ children, scrollable, className }: IBaseLayoutProps) => {
  return (
    <main
      className={cx(
        "flex grow flex-col gap-8 pb-12 pt-8 sm:py-12",
        scrollable ? "overflow-auto" : "overflow-hidden",
        className,
      )}
    >
      {children}
    </main>
  );
};
