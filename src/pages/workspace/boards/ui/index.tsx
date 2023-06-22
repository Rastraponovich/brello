import { ReactNode, memo } from "react";
import { Button, IButtonBaseProps } from "src/shared/ui/button";
import {
  FeaturedIcon,
  PlusIcon,
  TFeaturedIcon,
  MenuIcon,
  LayersTwoIcon,
  UserCircleIcon,
} from "src/shared/ui/icons/featured-icon/ui";
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
                <Button leftIcon={<SettingsIcon />} className="text-sm">
                  Settings
                </Button>
                <Button
                  variant="primary"
                  leftIcon={<UsersPlusIcon />}
                  className="text-sm"
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

const SettingsIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="settings-02">
        <g id="Icon">
          <path
            d="M7.82924 16.1426L8.31628 17.2379C8.46106 17.564 8.69734 17.841 8.99647 18.0355C9.29559 18.2299 9.6447 18.3334 10.0015 18.3333C10.3582 18.3334 10.7073 18.2299 11.0065 18.0355C11.3056 17.841 11.5419 17.564 11.6866 17.2379L12.1737 16.1426C12.3471 15.7539 12.6387 15.4298 13.007 15.2166C13.3777 15.0028 13.8065 14.9118 14.232 14.9564L15.4237 15.0833C15.7784 15.1208 16.1364 15.0546 16.4543 14.8927C16.7721 14.7309 17.0362 14.4802 17.2144 14.1713C17.3929 13.8625 17.4779 13.5085 17.4592 13.1524C17.4405 12.7962 17.3188 12.4531 17.1089 12.1648L16.4033 11.1953C16.1521 10.8476 16.0178 10.429 16.02 9.99996C16.0199 9.57212 16.1554 9.15525 16.407 8.80922L17.1126 7.83977C17.3225 7.55142 17.4442 7.20835 17.4629 6.85219C17.4816 6.49602 17.3966 6.14208 17.2181 5.83329C17.0399 5.52432 16.7758 5.2737 16.458 5.11182C16.1401 4.94993 15.7821 4.88373 15.4274 4.92126L14.2357 5.04811C13.8102 5.0928 13.3814 5.00173 13.0107 4.78792C12.6417 4.5735 12.35 4.24776 12.1774 3.85737L11.6866 2.762C11.5419 2.43594 11.3056 2.15889 11.0065 1.96446C10.7073 1.77003 10.3582 1.66657 10.0015 1.66663C9.6447 1.66657 9.29559 1.77003 8.99647 1.96446C8.69734 2.15889 8.46106 2.43594 8.31628 2.762L7.82924 3.85737C7.65668 4.24776 7.36497 4.5735 6.99591 4.78792C6.62525 5.00173 6.19647 5.0928 5.77091 5.04811L4.57554 4.92126C4.22081 4.88373 3.86282 4.94993 3.54497 5.11182C3.22711 5.2737 2.96305 5.52432 2.7848 5.83329C2.60632 6.14208 2.52128 6.49602 2.54002 6.85219C2.55876 7.20835 2.68046 7.55142 2.89035 7.83977L3.59591 8.80922C3.84753 9.15525 3.98302 9.57212 3.98295 9.99996C3.98302 10.4278 3.84753 10.8447 3.59591 11.1907L2.89035 12.1601C2.68046 12.4485 2.55876 12.7916 2.54002 13.1477C2.52128 13.5039 2.60632 13.8578 2.7848 14.1666C2.96323 14.4754 3.22732 14.7259 3.54513 14.8878C3.86294 15.0496 4.22084 15.1159 4.57554 15.0787L5.76721 14.9518C6.19276 14.9071 6.62155 14.9982 6.99221 15.212C7.36265 15.4258 7.65571 15.7516 7.82924 16.1426Z"
            stroke="#344054"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99997 12.5C11.3807 12.5 12.5 11.3807 12.5 9.99996C12.5 8.61925 11.3807 7.49996 9.99997 7.49996C8.61926 7.49996 7.49998 8.61925 7.49998 9.99996C7.49998 11.3807 8.61926 12.5 9.99997 12.5Z"
            stroke="#344054"
            strokeWidth="1.66667"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};

const UsersPlusIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="users-plus">
        <path
          id="Icon"
          d="M15.8333 17.5V12.5M13.3333 15H18.3333M9.99996 12.5H6.66663C5.11349 12.5 4.33692 12.5 3.72435 12.7537C2.90759 13.092 2.25867 13.741 1.92036 14.5577C1.66663 15.1703 1.66663 15.9469 1.66663 17.5M12.9166 2.7423C14.1382 3.23679 15 4.43443 15 5.83333C15 7.23224 14.1382 8.42988 12.9166 8.92437M11.25 5.83333C11.25 7.67428 9.75758 9.16667 7.91663 9.16667C6.07568 9.16667 4.58329 7.67428 4.58329 5.83333C4.58329 3.99238 6.07568 2.5 7.91663 2.5C9.75758 2.5 11.25 3.99238 11.25 5.83333Z"
          stroke="white"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
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

interface IAction extends IButtonBaseProps {
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
            className="mb-4 h-12 w-12 border-8 border-blue-50 bg-blue-100 sm:mb-4"
            iconClassName="text-blue-600 h-6 w-6"
            rounded
          />
        )}
        <h3 className="font-semibold text-gray-900">{title}</h3>
        {subTitle && (
          <p className="text-center text-sm text-gray-600">{subTitle}</p>
        )}
        <div className="mt-6 flex gap-3">
          {actions?.map(({ caption, ...action }, idx) => (
            <Button key={idx} {...action}>
              {caption}
            </Button>
          ))}
          <Button
            variant="primary"
            className="px-[18px]"
            size="lg"
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
      actions={[
        {
          caption: "Learn More",
          className: "hidden px-[18px] sm:flex",
          size: "lg",
        },
      ]}
    />
  );
};

const NotFoundState = () => {
  return (
    <BaseEmpty
      icon="search"
      title="No boards found"
      subTitle="Your search “Sprint #4” did not match any boards. Please try again."
      actions={[
        {
          caption: "Clear search",
          className: "px-[18px]",
          size: "lg",
        },
      ]}
    />
  );
};
