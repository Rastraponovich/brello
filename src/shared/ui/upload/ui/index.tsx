import { memo } from "react";
import { Button } from "../../button";
import { FeaturedIcon } from "../../icons/featured-icon/ui";
import { IUploadProps } from "..";

export const Upload = memo<IUploadProps>(() => {
  return (
    <div className="flex w-full max-w-[428px] flex-col justify-center gap-2 rounded-xl border border-dashed border-gray-200 px-6 py-4">
      <FeaturedIcon
        icon="upload-cloud"
        rounded
        className="self-center border-8 border-gray-50 bg-gray-100 hover:border-blue-50 hover:bg-blue-100 sm:mb-4"
        iconClassName="text-gray-600 h-5 w-5"
      />
      <div className="flex items-baseline justify-center gap-1">
        <Button size="md" variant="link">
          <span className="text-sm">Click to upload</span>
        </Button>
        <span className="hidden sm:inline">or drag and drop</span>
      </div>

      <span className="text-center text-xs text-gray-600">
        SVG, PNG, JPG or GIF (max. 800x400px)
      </span>
    </div>
  );
});

Upload.displayName = "Upload";
