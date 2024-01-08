declare module "*.svg" {
  const SvgComponent: import("react").FC<import("react").SVGAttributes<SVGElement>>;
  export default SvgComponent;
}

declare module "*.png" {
  const SvgComponent: import("react").FC<import("react").PNGAttributes<PNGElement>>;
  export default SvgComponent;
}
