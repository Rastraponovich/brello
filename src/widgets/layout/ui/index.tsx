import { ReactNode } from "react";
import { Header } from "src/widgets/header";

interface ILayoutProps {
  children: ReactNode;
}
export const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Header />
      <main className="container mx-auto my-0 flex grow flex-col gap-8 overflow-y-hidden pb-12 pt-8  sm:pb-12 sm:pt-12">
        {children}
      </main>
    </>
  );
};
