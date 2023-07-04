import { VariantProps, cva } from "class-variance-authority";

type TMarkerVariant = "active" | "disabled";
const markerStyles = cva("h-2.5 w-2.5 rounded-full", {
  variants: {
    variant: {
      active: "bg-green-500",
      disabled: "bg-gray-300",
    },
  },
  defaultVariants: {
    variant: "active",
  },
});

export type TMarkerStyles = VariantProps<typeof markerStyles>;

interface IMarker extends TMarkerStyles {
  variant?: TMarkerVariant;
}

export const Marker = ({ variant = "active" }: IMarker) => {
  return <i className={markerStyles({ variant })} />;
};
