import { Inter } from "next/font/google";

import "./globals.css";

import Providers from "@/components/Providers";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

export const metadata = {
    title: "PolitiCA",
    description: "A template repository with a setup I love",
    icons: [{ rel: "icon", url: "./favicon.ico" }],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <Providers>
                <body className={inter.className}>
                    <main className="bg-jas-light">{children}</main>
                </body>
            </Providers>
        </html>
    );
}
