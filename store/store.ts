"use client";

import { Theme } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";


interface AppState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      theme: "system",
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage",
    }
  )
);

// Apply theme function - can be called from anywhere
export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");

  if (theme === "system") {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    root.classList.add(systemTheme);
  } else {
    root.classList.add(theme);
  }
}

// Initialize theme
if (typeof window !== "undefined") {
  // Initial setup for theme
  const initializeTheme = () => {
    const theme = useStore.getState().theme;
    applyTheme(theme);

    // Setup listener for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (useStore.getState().theme === "system") {
        applyTheme("system");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  };

  // Set up store listener to apply theme when it changes
  useStore.subscribe(
    (state) => state.theme,
    //@ts-ignore
    (theme) => {
      applyTheme(theme);
    }
  );

  // Initialize on load
  initializeTheme();
}
