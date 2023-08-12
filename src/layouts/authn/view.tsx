import { ReactNode } from "react";

import { Icon } from "~/shared/ui/icon";
import { Logo } from "~/shared/ui/logo";

interface SignInLayoutProps {
  children: ReactNode;
}

export const LayoutAuthn = ({ children }: SignInLayoutProps) => {
  return (
    <main className="grid h-screen grid-rows-[62.5px_1fr] overflow-hidden sm:grid-cols-2 sm:grid-rows-none">
      <section className="order-last flex flex-col sm:order-first sm:gap-0 sm:px-0">
        <header className="px-4 pb-6 pt-8 sm:p-8">
          <Logo canHideTitle />
        </header>

        <section className="flex flex-col justify-center gap-8 px-4 sm:container sm:mx-auto sm:max-w-[360px] sm:grow sm:px-0">
          {children}
        </section>

        <footer className="hidden justify-between p-8 text-sm font-normal text-gray-400 sm:flex">
          <span>&copy; Brello 2023</span>
          <a href="mailto:help@brello.io" className="flex items-center gap-2">
            <Icon name="common/mail" size="small" />
            <span>help@brello.io</span>
          </a>
        </footer>
      </section>
      <aside className="order-first place-self-auto overflow-hidden sm:order-last">
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          src="/images/geometric-shapes.svg"
          className="hidden h-full w-full object-cover object-left-top sm:block"
        />
        <img
          alt="frendly image"
          data-qa="FrendlyImage"
          height={63}
          className="w-full object-left sm:hidden"
          src="/images/geometric-shapes-small.svg"
        />
      </aside>
    </main>
  );
};
