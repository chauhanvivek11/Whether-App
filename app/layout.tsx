import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenueBar from "./_components/menuebar";
import { ClerkProvider } from "@clerk/nextjs";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "A beautiful weather app built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
            <div className="container mx-auto flex justify-between items-center p-3 md:p-4">
              <Link href="/">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                  Weather App
                </h1>
              </Link>
              <div>
                <MenueBar />
              </div>
            </div>
          </header>

          <main className="container mx-auto mt-6 md:mt-10 px-4">
            {children}
          </main>

          <footer className="bg-gray-800 text-white text-center p-4 mt-10">
            <h4 className="text-base md:text-lg">Developed By: Vivek Chauhan</h4>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}