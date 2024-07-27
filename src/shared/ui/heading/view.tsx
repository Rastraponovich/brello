import { cva } from "class-variance-authority";
import { forwardRef, memo } from "react";

import { BaseHeadingProps } from "./model";

const heading = cva("", {
  variants: {
    as: {
      h1: "text-3xl",
      h2: "text-2xl",
      h3: "text-xl",
      h4: "text-lg",
      h5: "",
      h6: "",
    },
  },
  compoundVariants: [{ as: ["h1", "h2", "h3", "h4"], className: "font-semibold text-gray-900" }],
});

export const Heading = memo(
  forwardRef<HTMLHeadingElement, BaseHeadingProps>((props, ref) => {
    const { as: Component = "h2", caption, children, className, ...restProps } = props;

    return (
      <Component
        data-qa="Heading"
        ref={ref}
        {...restProps}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        className={heading({ as: Component, className })}
      >
        {children || caption}
      </Component>
    );
  }),
);

Heading.displayName = "Heading";
