import { ReactNode, memo } from "react";
import { Button } from "src/shared/ui/button";
import { IButtonBaseProps, IButtonBaseVariant } from "src/shared/ui/button/lib";
import {
  LayersTwoIcon,
  MenuIcon,
  PlusIcon,
  Settings2Icon,
  UserCircleIcon,
  UsersPlusIcon,
} from "src/shared/ui/icons/common";
import { TFeaturedIcon } from "src/shared/ui/icons/featured-icon";
import { FeaturedIcon } from "src/shared/ui/icons/featured-icon/ui";
import { Logo } from "src/shared/ui/icons/logo";
import { InputSearch } from "src/shared/ui/input";
import { NavItem, TNavItem } from "src/shared/ui/nav-item";

export const BoardsPage = () => {
  const navs: TNavItem[] = [
    { id: 1, title: "boards", icon: <LayersTwoIcon /> },
    { id: 2, title: "members", icon: <UserCircleIcon /> },
  ];

  const selected = 1;
  return (
    <div className="flex flex-col">
      <header className="flex items-center justify-center border-b border-gray-200 py-3 sm:py-4">
        <div className="container mx-auto my-0 flex w-full items-center justify-between gap-4 pl-4 pr-2 sm:px-8">
          <Logo />
          <div className="hidden grow items-center justify-between gap-1 sm:flex">
            <nav className="flex text-base font-semibold text-gray-500">
              {navs.map((nav) => (
                <NavItem key={nav.id} {...nav} selected={nav.id === selected} />
              ))}
            </nav>
          </div>
          <MenuIcon className="text-gray-500 hover:text-gray-900 sm:hidden" />
        </div>
      </header>
      <main className="container mx-auto my-0  flex h-screen flex-col items-center sm:gap-8 sm:pb-24 sm:pt-12">
        <section className=" flex w-full  flex-col space-y-4 py-8 sm:items-center sm:gap-6 sm:px-0 sm:py-0 ">
          <div className="flex w-full flex-col px-6 sm:px-8">
            <div className="flex w-full flex-col  gap-5 border-b border-gray-200 pb-5 sm:flex-row sm:justify-between">
              <div className="flex w-full grow space-x-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600">
                  CI
                </div>
                <div className="flex flex-col">
                  <h2 className="text-2xl font-semibold text-gray-900">
                    Coding in action
                  </h2>
                  <span className="text-gray-600">Private</span>
                </div>
              </div>
              <div className="flex shrink-0 items-start space-x-3">
                <Button
                  leftIcon={<Settings2Icon className="h-5 w-5" />}
                  size="sm"
                  variant="secondaryGray"
                >
                  Settings
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<UsersPlusIcon className="h-5 w-5" />}
                  size="sm"
                >
                  Invite members
                </Button>
              </div>
            </div>
          </div>
        </section>
        <Boards />
      </main>
    </div>
  );
};

const Boards = () => {
  const hasBoards = true;
  return (
    <section className="flex w-full flex-col items-center px-6 py-8 sm:px-8">
      {hasBoards ? (
        <div className="flex w-full flex-col gap-8">
          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold">Boards</h2>
            <InputSearch />
          </div>
          <div>
            <NotFoundState />
          </div>
        </div>
      ) : (
        <EmptyState />
      )}
    </section>
  );
};

interface IAction extends IButtonBaseProps, IButtonBaseVariant {
  caption: string;
}

interface IBaseEmptyProps {
  children?: ReactNode;
  icon?: TFeaturedIcon;
  title: string;
  subTitle?: string;
  actions?: IAction[];
}
const BaseEmpty = memo<IBaseEmptyProps>(
  ({ icon, title, subTitle, actions }) => {
    return (
      <div className="flex flex-col items-center">
        {icon && (
          <FeaturedIcon
            icon={icon}
            size="lg"
            type="circle"
            color="primary"
            variant="outline"
          />
        )}
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {subTitle && (
          <p className="text-center text-sm text-gray-600">{subTitle}</p>
        )}
        <div className="mt-6 flex gap-3">
          {actions?.map(({ caption, ...action }, idx) => (
            <Button key={idx} size="md" variant="secondaryGray" {...action}>
              {caption}
            </Button>
          ))}
          <Button
            variant="primary"
            size="md"
            leftIcon={<PlusIcon className="h-5 w-5" />}
          >
            New board
          </Button>
        </div>
      </div>
    );
  }
);

BaseEmpty.displayName = "BaseEmpty";
const EmptyState = () => {
  return (
    <BaseEmpty
      title="Start by creating a board"
      icon="plus"
      subTitle="Your boards will live here. Start creating by clicking on «New board»"
      actions={[{ caption: "Learn More", className: "hidden sm:flex" }]}
    />
  );
};

const NotFoundState = () => {
  return (
    <BaseEmpty
      icon="search"
      title="No boards found"
      subTitle="Your search “Sprint #4” did not match any boards. Please try again."
      actions={[{ caption: "Clear search" }]}
    />
  );
};
