import { forwardRef } from "react";

import { cx } from "~/shared/lib";

import { ScrollContainer } from "../scroll-area";

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
    <ScrollContainer type="always" orientation="horizontal" className="pb-4">
      <div ref={ref} className={cx("grid snap-x auto-cols-max grid-flow-col", containerClassName)}>
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
    </ScrollContainer>
  );
});

interface ImageProps {
  image: string;
  onClick(): void;
  selected: boolean;
  className?: string;
  containerClassName?: string;
}

function Image(props: ImageProps) {
  const { image, onClick, selected, className } = props;

  return (
    <div
      onClick={onClick}
      className={cx(
        "flex w-full select-none snap-start rounded-3xl border-[3px] border-transparent p-1",
        selected && "border-blue-600",
        className,
      )}
    >
      <span
        style={{ background: `url(${image}), lightgray 50%` }}
        className="pointer-events-none aspect-square size-[168px] shrink-0 select-none rounded-[18px] bg-cover bg-no-repeat"
      />
    </div>
  );
}
