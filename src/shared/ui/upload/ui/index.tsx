import { memo } from "react";
import { Button } from "../../button";
import { FeaturedIcon } from "../../icons/featured-icon/ui";
import { IUploadProps } from "..";

export const Upload = memo<IUploadProps>(() => {
  return (
    <div className="flex w-full max-w-[428px] flex-col items-center gap-2 rounded-xl border border-dashed border-gray-200 px-6 py-4">
      <FeaturedIcon
        icon="upload-cloud"
        size="md"
        variant="outline"
        type="circle"
        color="gray"
        className="sm:mb-4"
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
