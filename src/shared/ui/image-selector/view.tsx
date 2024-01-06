import { forwardRef } from "react";

import { cx } from "~/shared/lib";

interface ImagePickerBaseProps {
  imagesCount?: number;
  selectedImage: string;
  imageClassName?: string;
  containerClassName?: string;
  imageContainerClassName?: string;
  onImageChange: (value: string) => void;
}

export const ImagePickerBase = forwardRef<HTMLDivElement, ImagePickerBaseProps>((props, ref) => {
  const {
    selectedImage,
    onImageChange,
    imageClassName,
    imagesCount = 10,
    containerClassName,
    imageContainerClassName,
  } = props;

  return (
    <div
      ref={ref}
      className={cx(
        "grid grid-flow-col auto-cols-max overflow-x-auto scroll-bar snap-x",
        containerClassName,
      )}
    >
      {Array.from({ length: imagesCount }).map((_, id) => {
        const convertedImageToString = `https://source.unsplash.com/random/168x168?${id}&background`;
        const selected = convertedImageToString === selectedImage;
        const handleClick = () => onImageChange(convertedImageToString);

        return (
          <Image
            key={id}
            selected={selected}
            onClick={handleClick}
            className={imageClassName}
            image={convertedImageToString}
            containerClassName={imageContainerClassName}
          />
        );
      })}
    </div>
  );
});

interface ImageProps {
  image: string;
  onClick(): void;
  selected: boolean;
  className?: string;
  containerClassName?: string;
}

const Image = ({ image, onClick, selected, className }: ImageProps) => {
  return (
    <div
      onClick={onClick}
      className={cx(
        "snap-start p-1 rounded-3xl flex border-[3px] border-transparent w-full select-none",
        selected && "border-blue-600",
        className,
      )}
    >
      <span
        style={{ background: `url(${image}), lightgray 50%` }}
        className="h-[168px] w-[168px] rounded-[18px] shrink-0 pointer-events-none select-none bg-cover bg-no-repeat"
      />
    </div>
  );
};
