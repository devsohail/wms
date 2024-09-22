import "./bootstrap";

import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from './context/AuthContext';
import 'react-toastify/dist/ReactToastify.css';

createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props, plugin }) {
        createRoot(el)
            .render(
                <AuthProvider>
                    <App {...props} />
                </AuthProvider>
            );
    },
    progress: {
        color: "#4B5563",
    },
});
