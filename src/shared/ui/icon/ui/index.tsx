import clsx from "clsx";
import { ComponentProps, forwardRef, ForwardedRef } from "react";

const Sprite = (
  props: ComponentProps<"svg"> & {
    source?: string;
  },
  svgRef: ForwardedRef<SVGSVGElement>
) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden={true}
      {...props}
      ref={svgRef}
    >
      <use
        xlinkHref={`${
          props.source
            ? `/icons/${props.source}.svg#${props.name}`
            : `/icons/sprites.svg#${props.name}`
        }`}
      ></use>
    </svg>
  );
};
export const SpriteIcons = forwardRef(Sprite);

enum BaseIconSize {
  normal = "h-5 w-5",
  large = "h-6 w-6",
}
export interface IBaseIconSize {
  size: "normal" | "large";
}
export type IBaseIcon = ComponentProps<"svg"> & TBaseIconProps & IBaseIconSize;

export type TBaseIconProps =
  | {
      source: "general";
      icon:
        | "plus"
        | "plus-circle"
        | "plus-square"
        | "search-lg"
        | "dots-vertical"
        | "logout"
        | "settings"
        | "x-close";
    }
  | {
      source: "layout";
      icon: "layers-two";
    }
  | {
      source: "security";
      icon: "menu" | "folder-shield";
    }
  | {
      source: "users";
      icon: "user" | "user-circle" | "users-plus";
    }
  | {
      source: "shapes";
      icon: "star";
    };

export const BaseIcon = forwardRef<SVGSVGElement, IBaseIcon>(
  (
    { icon, source, size = "normal", ...props }: IBaseIcon,
    ref: ForwardedRef<SVGSVGElement>
  ) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden={true}
        {...props}
        className={clsx(props.className, BaseIconSize[size])}
        ref={ref}
      >
        <use xlinkHref={`/icons/${source}.svg#${icon}-icon`}></use>
      </svg>
    );
  }
);
BaseIcon.displayName = "__BaseIcon__";
