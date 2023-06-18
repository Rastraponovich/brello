import { memo } from "react";

interface IFeaturedIconProps {
  icon: "user" | "shield-folder";
}
export const FeaturedIcon = memo<IFeaturedIconProps>(({ icon }) => {
  const Component = ICON_DICT[icon];
  return (
    <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-xl border border-gray-200 bg-white sm:mb-12">
      <Component className=" text-gray-700" />
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

interface IShieldFolderIcon {
  className: string;
}
const ShieldFolderIcon = ({ className }: IShieldFolderIcon) => {
  return (
    <svg
      width="26"
      height="24"
      viewBox="0 0 26 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.1667 6.16667L12.8652 3.56374C12.4906 2.8146 12.3034 2.44002 12.0239 2.16636C11.7769 1.92435 11.4791 1.7403 11.1521 1.62753C10.7824 1.5 10.3636 1.5 9.52602 1.5H5.06668C3.75989 1.5 3.10649 1.5 2.60737 1.75432C2.16832 1.97802 1.81137 2.33498 1.58766 2.77402C1.33334 3.27315 1.33334 3.92654 1.33334 5.23333V6.16667M1.33334 6.16667H19.0667C21.0269 6.16667 22.007 6.16667 22.7556 6.54814C23.4142 6.8837 23.9496 7.41913 24.2852 8.0777C24.6667 8.82639 24.6667 9.80648 24.6667 11.7667V16.9C24.6667 18.8602 24.6667 19.8403 24.2852 20.589C23.9496 21.2475 23.4142 21.783 22.7556 22.1185C22.007 22.5 21.0269 22.5 19.0667 22.5H6.93334C4.97316 22.5 3.99307 22.5 3.24438 22.1185C2.58581 21.783 2.05038 21.2475 1.71482 20.589C1.33334 19.8403 1.33334 18.8602 1.33334 16.9V6.16667ZM13 18.4167C13 18.4167 16.5 16.7484 16.5 14.2461V11.3267L13.9478 10.4147C13.3346 10.1951 12.664 10.1951 12.0508 10.4147L9.50001 11.3267V14.2461C9.50001 16.7484 13 18.4167 13 18.4167Z"
        stroke="#344054"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ICON_DICT = {
  user: UserIcon,
  "shield-folder": ShieldFolderIcon,
};
