import type { Metadata } from "next";
import "./globals.css";
import { Vazirmatn } from "next/font/google";


const vazir = Vazirmatn({ subsets: ["arabic"], variable: "--font-vazir" });


export const metadata: Metadata = {
    title: "Mini Auth – Iran Phone",
    description: "Client-side auth demo with Iran phone validation (Next.js + TS + Tailwind + shadcn/ui)",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fa" dir="rtl">
        <body className={`${vazir.variable} font-sans bg-gray-50 text-gray-900`}>{children}</body>
        </html>
    );
}
