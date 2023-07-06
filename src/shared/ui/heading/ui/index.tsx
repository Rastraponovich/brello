import { forwardRef, memo } from "react";

import { type models } from "../lib";

export const Heading = memo(
  forwardRef<HTMLHeadingElement, models.IHeadingProps>(
    ({ as: Component = "h2", caption, children, ...props }, ref) => {
      return (
        <Component data-qa="Heading" ref={ref} {...props}>
          {children || caption}
        </Component>
      );
    },
  ),
);

Heading.displayName = "Heading";
