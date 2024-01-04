import { type ReactNode } from "react";

import { Header } from "~/widgets/header";

import { cx } from "~/shared/lib";

interface LayoutProps {
  children: ReactNode;
  scrollable?: boolean;
}

export const MainLayout = ({ children, scrollable }: LayoutProps) => {
  return (
    <>
      <Header />
      <BaseLayout scrollable={scrollable}>{children}</BaseLayout>
    </>
  );
};

interface IBaseLayoutProps {
  children: ReactNode;
  scrollable?: boolean;
}

export const BaseLayout = ({ children, scrollable }: IBaseLayoutProps) => {
  return (
    <main
      className={cx(
        "flex grow flex-col gap-8 pb-12 pt-8  sm:pb-12 sm:pt-12",
        scrollable ? "overflow-auto" : "overflow-hidden",
      )}
    >
      {children}
    </main>
  );
};
