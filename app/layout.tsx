import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../public/css/theme-toggle.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Anthony Dimojiaku | Software Engineer",
  description: "AI Agentic Builder | Full Stack Engineer",
};

// app/layout.tsx
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/images/logoo.svg" />
        <link href="https://fonts.cdnfonts.com/css/effra" rel="stylesheet" />
      </head>
      <body
        className={`antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
