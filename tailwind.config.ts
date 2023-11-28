import type { Config } from "tailwindcss";

const easing = {
    easeInOutCubic: "cubic-bezier(0.65, 0, 0.35, 1)",
};

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                "13": "repeat(13, minmax(0, 1fr))",
            },
            colors: {
                eaiRed: {
                    50: "#FCF0E9",
                    100: "#FAE6DC",
                    200: "#F4CEBE",
                    300: "#EEB8A4",
                    400: "#E89E87",
                    500: "#E2866F",
                    600: "#DA6D56",
                    700: "#BF4527",
                    800: "#813118",
                    900: "#411A0C",
                    950: "#1F0D05",
                },
            },
        },
        keyframes: {
            shimmer: {
                "100%": {
                    transform: "translateX(100%)",
                },
            },
            "accordion-down": {
                from: { height: "0" },
                to: { height: "var(--radix-accordion-content-height)" },
            },
            "accordion-up": {
                from: { height: "var(--radix-accordion-content-height)" },
                to: { height: "0" },
            },
        },
        animation: {
            "accordion-down": `accordion-down 0.2s ${easing.easeInOutCubic}`,
            "accordion-up": `accordion-up 0.2s ${easing.easeInOutCubic}`,
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
export default config;
