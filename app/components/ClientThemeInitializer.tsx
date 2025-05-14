"use client";


import { applyTheme, useStore } from "@/store/store";
import { useEffect } from "react";

export default function ClientThemeInitializer() {
  const { theme } = useStore();

  useEffect(() => {
    // Apply theme on client side
    applyTheme(theme);

    // Set up listener for system preference changes
    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = () => {
        applyTheme("system");
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, [theme]);

  return null; // This component doesn't render anything
}
