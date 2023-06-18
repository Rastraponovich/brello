import { memo } from "react";

export const FeaturedIcon = memo(() => {
  return (
    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white sm:mb-12">
      <UserIcon className=" text-gray-700" />
    </div>
  );
});

FeaturedIcon.displayName = "FeaturedIcon";

interface IUserIconProps {
  className: string;
}
const UserIcon = memo<IUserIconProps>(({ className }) => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 24.5C23.3333 22.8718 23.3333 22.0578 23.1324 21.3953C22.6799 19.9039 21.5128 18.7367 20.0213 18.2843C19.3589 18.0833 18.5448 18.0833 16.9167 18.0833H11.0833C9.45517 18.0833 8.64109 18.0833 7.97866 18.2843C6.48719 18.7367 5.32004 19.9039 4.8676 21.3953C4.66666 22.0578 4.66666 22.8718 4.66666 24.5M19.25 8.75C19.25 11.6495 16.8995 14 14 14C11.1005 14 8.74999 11.6495 8.74999 8.75C8.74999 5.8505 11.1005 3.5 14 3.5C16.8995 3.5 19.25 5.8505 19.25 8.75Z"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
});

UserIcon.displayName = "UserIcon";
