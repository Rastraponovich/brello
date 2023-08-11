import { DetailedHTMLProps, ElementType, HTMLAttributes, ReactNode } from "react";

export type THeadingElement = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

export interface IHeadingProps extends THeadingElement {
  caption?: never | string | number;
  as: ElementType<THeadingElement>;
  children?: never | ReactNode;
}

type TConditionalHeadingProps = { children: ReactNode } | { caption: string | number };

export type IHeanding = TConditionalHeadingProps & IHeadingProps;
