import "./bootstrap";

import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";


createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),

    setup({ el, App, props, plugin }) {
        createRoot(el)
            .render(<App {...props} />);
    },

    progress: {
        color: "#4B5563",
    },
});


