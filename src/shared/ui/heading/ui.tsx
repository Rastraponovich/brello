import { forwardRef, memo } from "react";

import { type models } from "./lib";
import { cva } from "class-variance-authority";

const heading = cva("", {
  variants: {
    as: {
      h1: "text-3xl text-gray-900 font-semibold",
      h2: "",
      h3: "",
      h4: "",
      h5: "",
      h6: "",
    },
  },
});

export const Heading = memo(
  forwardRef<HTMLHeadingElement, models.IHeadingProps>(
    ({ as: Component = "h2", caption, children, className, ...props }, ref) => {
      return (
        <Component
          data-qa="Heading"
          ref={ref}
          {...props}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          className={heading({ as: Component, className })}
        >
          {children || caption}
        </Component>
      );
    },
  ),
);

Heading.displayName = "Heading";
