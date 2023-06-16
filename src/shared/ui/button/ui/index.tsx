import { ButtonHTMLAttributes, Ref, memo, useMemo, useRef } from "react";
import { IButtonProps } from "../lib";
import clsx from "clsx";
import { SpriteIcons } from "src/shared/ui/icon";

export const Button = memo<IButtonProps>(
  ({ caption, pending, iconPosition = "left", icon, ...props }) => {
    const className = useMemo(() => {
      return clsx(
        props.className,
        "flex space-x-2 justify-center",
        iconPosition && iconPosition === "left"
          ? "flex-row"
          : "flex-row-reverse space-x-reverse"
        // iconPosition ? "justify-between" : "justify-center"
      );
    }, [iconPosition, props.className]);
    return (
      <button
        {...props}
        data-qa="Shared__Button"
        title={caption}
        className={className}
      >
        {!!pending && <span>isPending</span>}
        {!!icon && <SpriteIcons name={icon} className="h-4 w-4" />}
        <span>{caption}</span>
      </button>
    );
  }
);

Button.displayName = "Button";

interface ISocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  authService:
    | "google"
    | "facebook"
    | "apple"
    | "figma"
    | "twitter"
    | "dribbble";
  textAlign?: "center" | "left" | "right";
  noCaption?: boolean;
}
export const SocialButton = memo<ISocialButtonProps>(
  ({ authService, textAlign = "left", noCaption = false, className }) => {
    const ref = useRef<Ref<SVGSVGElement>>();
    return (
      <button
        className={clsx(
          "flex items-center gap-3 rounded-lg border border-gray-300 text-base text-gray-600 hover:bg-gray-50",
          className,
          textAlign === "center" && "justify-center",
          textAlign === "right" && "justify-end",
          noCaption ? "p-2.5" : "px-4 py-2.5"
        )}
      >
        <SpriteIcons
          ref={ref as Ref<SVGSVGElement>}
          name={authService}
          source="social-icons"
          className="h-6 w-6"
        />
        {!noCaption && <span>Sign in with {authService.toUpperCase()}</span>}
      </button>
    );
  }
);
