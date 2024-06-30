import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        page1: "deepdive.html",
        page2: "solarSystem.html",
        page3: "galaxy.html",
        page4: "particals.html",
      },
    },
  },
});
