import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Expense explorer",
    description: "An app to explore your expenses.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ToastContainer />
                <div className="grid grid-cols-[0.2fr_1fr]">
                    <Nav />
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
