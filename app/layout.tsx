import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/css/theme-toggle.css";
import Providers from "./providers";
import ClientThemeInitializer from "./components/ClientThemeInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anthony Dimojiaku | Software Engineer",
  description: "AI Agentic Builder | Full Stack Engineer",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/logoo.svg" />
        <link href="https://fonts.cdnfonts.com/css/effra" rel="stylesheet" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <Providers> */}
        <ClientThemeInitializer />
        {children}
        {/* </Providers> */}
      </body>
    </html>
  );
}
