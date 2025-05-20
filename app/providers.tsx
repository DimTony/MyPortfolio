"use client";

import { useDelay } from "@/hooks/useDelay";
import { ThemeProvider } from "next-themes";
import { Loader } from "./sections";
import ForceDarkMode from "./components/ForceDarkMode";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isReady = useDelay(2000);

  if (!isReady) {
    return <Loader />;
  }


  return (
    <SessionProvider>
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ForceDarkMode />
      {children}
      <Toaster position="top-right" richColors />
    </ThemeProvider>
    </SessionProvider>
  );
}
