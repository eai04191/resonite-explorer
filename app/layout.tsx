import "@/app/ui/global.css";

import { inter } from "@/app/ui/fonts";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-eaiRed-50 text-eaiRed-950 antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
