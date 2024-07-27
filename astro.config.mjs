import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
    site: "https://examenes-viejos.pages.dev/",
    integrations: [
        tailwind({
            applyBaseStyles: false,
        }),
        react(),
        icon(),
        sitemap(),
    ],
});
