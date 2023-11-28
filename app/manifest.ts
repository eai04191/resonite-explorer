import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Resonite Explorer",
        short_name: "REx",
        description: "A simple web app to explore the Resonite API",
        start_url: "/",
        theme_color: "#da6d56",
        icons: [
            {
                src: "./icon_blank.svg",
                sizes: "any",
                type: "image/svg+xml",
            },
        ],
    };
}
