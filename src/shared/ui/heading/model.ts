import type { DetailedHTMLProps, ElementType, HTMLAttributes, ReactNode } from "react";

export type HeadingElement = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export interface BaseHeadingProps extends HeadingElement {
  caption?: never | string | number;
  as: ElementType<HeadingElement>;
  children?: never | ReactNode;
}

type ConditionalHeadingProps = { children: ReactNode } | { caption: string | number };

export type HeadingProps = ConditionalHeadingProps & BaseHeadingProps;
