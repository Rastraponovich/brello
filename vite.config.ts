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
      src: "/src",
      shared: "/src/shared",
      entities: "/src/entities",
      app: "/src/app",
      pages: "/src/pages",
    },
  },
});
