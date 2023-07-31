import { cva, cx } from "class-variance-authority";
import { TButtonSize, TVariant } from "./models";

/**
 * @description destructive color scheme
 */
const destructiveButtonColor = cva("", {
  variants: {
    variant: {
      link: "",
      linkGray: "",
      primary:
        "bg-rose-600 border-rose-600 text-white hover:bg-rose-700 disabled:bg-rose-200",
      tertiary: "",
      tertiaryGray: "",
      secondary:
        "border-rose-50  bg-rose-50 hover:border-rose-100  hover:bg-rose-100  disabled:bg-[#FFFBFA] disabled:border-[#FFFBFA] ",
      secondaryGray: "bg-white border-rose-300  hover:bg-rose-50 ",
    },
  },
  compoundVariants: [
    {
      variant: ["primary", "secondaryGray"],
      className: "disabled:border-rose-200",
    },
    {
      variant: ["primary", "secondary", "secondaryGray"],
      className: "focus:ring-4 focus:ring-rose-100",
    },
    {
      variant: ["tertiary", "tertiaryGray", "secondaryGray"],
      className: "disabled:hover:bg-inherit",
    },
    {
      variant: ["tertiary", "tertiaryGray"],
      className:
        "hover:border-rose-50 hover:bg-rose-50 disabled:border-transparent",
    },
    {
      variant: ["link", "linkGray"],
      className: "focus:outline-none border-none !p-0",
    },
    {
      variant: [
        "link",
        "linkGray",
        "tertiary",
        "tertiaryGray",
        "secondary",
        "secondaryGray",
      ],
      className: "text-rose-700 hover:text-rose-800 disabled:text-rose-300",
    },
  ],
});

/**
 * @description default color scheme
 */
const defaultButtonColor = cva("", {
  variants: {
    variant: {
      link: "",
      linkGray: "",
      primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-200",
      tertiary:
        " hover:border-blue-50 hover:bg-blue-50 disabled:border-transparent",
      tertiaryGray: "",
      secondary:
        "border-blue-50 hover:border-blue-100 bg-blue-50 hover:bg-blue-100  disabled:bg-[#F5F8FF] disabled:text-blue-300 disabled:border-[#F5F8FF] focus:outline-blue-100",
      secondaryGray: "hover:text-gray-800 text-gray-700",
    },
  },
  compoundVariants: [
    {
      variant: ["tertiary", "tertiaryGray"],
      className: "border-transparent",
    },
    {
      variant: ["tertiary", "tertiaryGray", "secondaryGray"],
      className: "disabled:hover:bg-transparent",
    },
    {
      variant: ["secondaryGray", "tertiaryGray"],
      className: "hover:bg-gray-50",
    },
    {
      variant: ["link", "linkGray"],
      className: "focus:outline-none border-none !p-0",
    },
    {
      variant: ["linkGray", "tertiaryGray"],
      className: "text-gray-600  hover:text-gray-700",
    },
    {
      variant: ["link", "tertiary", "secondary"],
      className: "text-blue-700 hover:text-blue-800",
    },
    {
      variant: [
        "secondaryGray",
        "tertiaryGray",
        "link",
        "linkGray",
        "tertiary",
      ],
      className: "disabled:text-gray-300",
    },
  ],
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * @description size of icon-buttons
 */
const buttonIconSize = cva("", {
  variants: {
    size: {
      xs: "p-2",
      sm: "p-2.5",
      md: "p-3",
      lg: "p-3.5",
      xl: "p-4",
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

/**
 * @description size of buttons
 */
const buttonSize = cva("", {
  variants: {
    size: {
      xs: "py-2 px-3.5",
      sm: "py-2.5 px-4",
      md: "py-2.5 px-4.5",
      lg: "py-3 px-5",
      xl: "py-4 px-7 text-xl gap-3",
    },
  },
  compoundVariants: [
    { size: ["xs", "sm"], className: "text-sm" },
    { size: ["md", "lg"], className: "text-base" },
    { size: ["xs", "sm", "md", "lg"], className: "gap-2" },
  ],
  defaultVariants: {
    size: "sm",
  },
});

/**
 * @description style generate function for CloseXButton component
 */
export const closeXButton = cva(
  "flex items-center rounded-lg border border-transparent font-semibold",
  {
    variants: {
      size: {
        sm: "p-2",
        md: "",
        lg: "",
      },
      variant: {
        primary:
          "text-blue-500 hover:bg-blue-50 hover:text-blue-600 focus:bg-blue-50",
        gray: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 focus:bg-gray-50",
      },
    },
    compoundVariants: [
      {
        size: ["md", "lg"],
        className: "p-2.5",
      },
    ],
    defaultVariants: {
      size: "sm",
      variant: "primary",
    },
  },
);

/**
 * @description style generate function for IconButton component
 */
export const iconButton = ({
  size,
  variant,
  className,
  destructive,
}: {
  variant: TVariant;
  size: TButtonSize;
  className: string | undefined;
  destructive: boolean;
}) =>
  cx(
    "flex shrink items-center rounded-lg border font-semibold",
    destructive
      ? destructiveButtonColor({ variant, className })
      : defaultButtonColor({ variant, className }),
    buttonIconSize({ size }),
  );

/**
 * @description style generate function for Button component
 */
export const button = ({
  variant,
  size,
  className,
  destructive = false,
}: {
  variant: TVariant;
  size: TButtonSize;
  className: string | undefined;
  destructive: boolean;
}) =>
  cx(
    "flex shrink items-center rounded-lg border font-semibold justify-center",
    buttonSize({ size }),
    destructive
      ? destructiveButtonColor({ variant, className })
      : defaultButtonColor({ variant, className }),
  );
