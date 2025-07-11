import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.jsx",
            ssr: "resources/js/ssr.jsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        hmr: {
            // host: "192.168.1.105",
            host: "localhost",
        },
    },
});
