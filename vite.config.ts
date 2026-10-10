import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { nitro } from "nitro/vite";

const normalizeBase = (value?: string) => {
  if (!value || value === "/") return "/";
  return `/${value.replace(/^\/+|\/+$/g, "")}/`;
};

export default defineConfig(({ command }) => ({
  base: normalizeBase(process.env["VITE_BASE_PATH"]),
  plugins: [
    tailwindcss(),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({ server: { entry: "server" } }),
    ...(command === "build" ? [nitro({ preset: "node-server" })] : []),
    react(),
  ],
  resolve: { dedupe: ["react", "react-dom", "@tanstack/react-router"] },
  server: {
    watch: { ignored: ["**/.output/**", "**/qa/**", "**/wybrane/**", "**/.cleanup-backup/**"] },
  },
}));
