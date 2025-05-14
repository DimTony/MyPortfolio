"use client";

import { useDelay } from "@/hooks/useDelay";
import { ThemeProvider } from "next-themes";
import { Loader } from "./sections";
import ForceDarkMode from "./components/ForceDarkMode";

export default function Providers({ children }: { children: React.ReactNode }) {
  const isReady = useDelay(2000);

  if (!isReady) {
    return <Loader />;
  }


  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      <ForceDarkMode />
      {children}
    </ThemeProvider>
  );
}
