import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
                sans: ["Roboto", ...defaultTheme.fontFamily.sans],
            },
            colors: {
                agri: {
                    // Primary colors
                    primary: {
                        50: "#f0f7ef",
                        100: "#d5e9d4",
                        200: "#a7d3a5",
                        300: "#7cbd79", // Main primary green
                        400: "#5B8C5A", // Default primary
                        500: "#4a7d48",
                        600: "#3a6d38",
                        700: "#2a5d28",
                    },
                    // Secondary/Accent colors
                    accent: {
                        50: "#f4f9f3",
                        100: "#d8ebd5",
                        200: "#A7C4A2", // Soft green
                        300: "#8db887",
                    },
                    // Neutral backgrounds
                    light: "#F0ECE3", // Creamy beige
                    // Text colors
                    dark: "#4A5E4B", // Dark moss green
                    // Utility colors
                    earth: "#C4B6A6", // Soft brown
                    success: "#5B8C5A",
                    warning: "#E9C46A",
                    error: "#E76F51",
                },
            },
        },
    },

    // plugins: [forms],

    important: true,
};
