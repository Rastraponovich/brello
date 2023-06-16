import clsx from "clsx";
import { Ref, memo, useRef } from "react";
import { Button, helpers } from "src/shared/ui/button";
import { SpriteIcons } from "src/shared/ui/icon";
import { ISocialButtonProps } from "../lib";

export const SocialAuthButton = memo<ISocialButtonProps>(
  ({
    authService,
    textAlign = helpers.EButtonTextAlign.Center,
    noCaption = false,
    className,
  }) => {
    const ref = useRef<Ref<SVGSVGElement>>();
    return (
      <Button
        className={clsx(
          "border-gray-300 text-gray-600 hover:bg-gray-50",
          className,
          noCaption ? "p-2.5" : "px-4 py-2.5"
        )}
        textAlign={textAlign}
      >
        <SpriteIcons
          ref={ref as Ref<SVGSVGElement>}
          name={authService}
          source="social-icons"
          className="h-6 w-6"
        />
        {!noCaption && <span>Sign in with {authService.toUpperCase()}</span>}
      </Button>
    );
  }
);
