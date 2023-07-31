import { VariantProps, cva } from "class-variance-authority";
import { forwardRef } from "react";

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
  className?: string;
}

export const Marker = forwardRef<HTMLElement, IMarker>(
  ({ variant = "active", className }, ref) => {
    return <i ref={ref} className={markerStyles({ variant, className })} />;
  },
);

Marker.displayName = "Marker";
