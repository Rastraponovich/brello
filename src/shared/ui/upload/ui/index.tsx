import { memo, useCallback, useRef } from "react";
import { Button } from "shared/ui/button";
import { FeaturedIcon } from "shared/ui/icons/featured-icon/ui";
import { type models } from "../lib";
import clsx from "clsx";

export const Upload = memo<models.IUploadProps>(({ disabled }) => {
  const fileRef = useRef<HTMLInputElement>(null);

  const handleClick = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);
  return (
    <div
      className={clsx(
        "flex w-full flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 px-6 py-4 ",
        disabled ? "bg-gray-50" : "hover:ring-2 hover:ring-blue-600"
      )}
    >
      <label className="relative flex w-full flex-col items-center gap-2 sm:gap-3">
        <FeaturedIcon
          size="md"
          color="gray"
          type="circle"
          variant="outline"
          icon="upload-cloud"
        />
        <input
          id="input"
          type="file"
          ref={fileRef}
          accept="image/*"
          className="absolute h-0 w-0 opacity-0"
        />
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline justify-center gap-1">
            <Button
              size="md"
              variant="link"
              disabled={disabled}
              onClick={handleClick}
            >
              <span className="text-sm">Click to upload</span>
            </Button>
            <span className="hidden sm:inline">or drag and drop</span>
          </div>

          <span className="text-center text-xs text-gray-600">
            SVG, PNG, JPG or GIF (max. 800x400px)
          </span>
        </div>
      </label>
    </div>
  );
});

Upload.displayName = "Upload";
