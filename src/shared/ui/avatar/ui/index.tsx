import { memo } from "react";

interface IAvatarProps {
  foo?: "bar";
}
export const Avatar = memo<IAvatarProps>(() => {
  return (
    <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-300">
      X
    </button>
  );
});
