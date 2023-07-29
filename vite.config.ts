import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svg from "@neodx/svg/vite";

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
      definitions: "src/shared/ui/icon/sprite.h.ts",
      resetColors: {
        replaceUnknown: "currentColor",
        properties: "stroke",
      },
    }),
  ],
  resolve: {
    alias: {
      app: "/src/app",
      pages: "/src/pages",
      shared: "/src/shared",
      widgets: "/src/widgets",
      entities: "/src/entities",
      features: "/src/features",
    },
  },
});
