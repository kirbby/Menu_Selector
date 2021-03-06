import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    resolve: {
        alias: [
            {
                find: "@",
                replacement: "/src"
            }
        ]
    },
    base: "/planner/",
    server: {
        port: 3000,
    },
});
