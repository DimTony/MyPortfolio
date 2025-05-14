"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function ForceDarkMode() {
  const { resolvedTheme } = useTheme();

  // This effect forcefully applies the dark class to the HTML element
  useEffect(() => {
    if (typeof window !== "undefined") {
      const htmlElement = document.documentElement;

      if (resolvedTheme === "dark") {
        htmlElement.classList.add("dark");
      } else {
        htmlElement.classList.remove("dark");
      }

      console.log("Theme forced to:", resolvedTheme);
      console.log("HTML classes:", htmlElement.classList.toString());
    }
  }, [resolvedTheme]);

  return null; // This component doesn't render anything
}
