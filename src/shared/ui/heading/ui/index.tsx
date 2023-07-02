import { memo } from "react";
import { models } from "../lib";

export const Heading = memo<models.IHeanding>(
  ({ as: Component = "h2", caption, children, ...props }) => {
    return (
      <Component data-qa="Heading" {...props}>
        {children || caption}
      </Component>
    );
  }
);

Heading.displayName = "Heading";
