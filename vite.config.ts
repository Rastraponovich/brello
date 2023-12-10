import svg from "@neodx/svg/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        babelrc: true,
      },
    }),
    svg({
      root: "src/shared/ui/icon/assets",
      group: true,
      output: "public/sprites",
      metadata: {
        path: "src/shared/ui/icon/sprite.h.ts",
      },
      resetColors: {
        replaceUnknown: "currentColor",
        properties: "stroke",
        exclude: [/[a-z]*-colored\.svg$/],
      },
    }),
  ],
  resolve: {
    alias: {
      "~/app": "/src/app",
      "~/pages": "/src/pages",
      "~/layouts": "/src/layouts",
      "~/widgets": "/src/widgets",
      "~/features": "/src/features",
      "~/entities": "/src/entities",
      "~/shared": "/src/shared",
    },
  },
});
