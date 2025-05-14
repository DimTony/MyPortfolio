"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeDebugger() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlHasDarkClass, setHtmlHasDarkClass] = useState(false);
  const [tailwindWorking, setTailwindWorking] = useState(false);
  const [cssVarWorking, setCssVarWorking] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if dark class is applied
    const checkDarkClass = () => {
      const hasDarkClass = document.documentElement.classList.contains("dark");
      setHtmlHasDarkClass(hasDarkClass);

      // Get computed styles to check if they're applying
      const testElement = document.getElementById("tailwind-test");
      const cssVarElement = document.getElementById("css-var-test");

      if (testElement) {
        const bgColor = window.getComputedStyle(testElement).backgroundColor;
        setTailwindWorking(
          (hasDarkClass && bgColor === "rgb(22, 101, 52)") || // dark:bg-green-800
            (!hasDarkClass && bgColor === "rgb(59, 130, 246)") // bg-blue-500
        );
      }

      if (cssVarElement) {
        const bgColor = window.getComputedStyle(cssVarElement).backgroundColor;
        setCssVarWorking(
          (hasDarkClass && bgColor !== "rgb(255, 255, 255)") ||
            (!hasDarkClass && bgColor === "rgb(255, 255, 255)")
        );
      }
    };

    checkDarkClass();

    // Set up a mutation observer to watch for class changes on HTML
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class"
        ) {
          checkDarkClass();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Force dark/light mode for testing
  const forceDarkMode = () => {
    document.documentElement.classList.add("dark");
    setTheme("dark");
  };

  const forceLightMode = () => {
    document.documentElement.classList.remove("dark");
    setTheme("light");
  };

  if (!mounted) return null;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Theme Debugger</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="p-4 border rounded">
          <h2 className="text-xl mb-2">Theme State</h2>
          <ul className="space-y-2">
            <li>
              resolvedTheme: <strong>{resolvedTheme}</strong>
            </li>
            <li>
              theme: <strong>{theme}</strong>
            </li>
            <li>
              HTML has 'dark' class:{" "}
              <strong>{htmlHasDarkClass ? "Yes" : "No"}</strong>
            </li>
            <li>
              Tailwind dark mode working:{" "}
              <strong>{tailwindWorking ? "Yes" : "No"}</strong>
            </li>
            <li>
              CSS Variables working:{" "}
              <strong>{cssVarWorking ? "Yes" : "No"}</strong>
            </li>
          </ul>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-xl mb-4">Tests</h2>
          <div className="space-y-4">
            <div
              id="tailwind-test"
              className="bg-blue-500 dark:bg-green-800 p-3 text-white"
            >
              This should be BLUE in light and GREEN in dark
            </div>

            <div
              id="css-var-test"
              className="p-3 text-black dark:text-white"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--card-border)",
                border: "1px solid",
              }}
            >
              This uses CSS variables
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-8">
        <button
          onClick={forceLightMode}
          className="px-4 py-2 bg-yellow-400 text-black rounded"
        >
          Force Light Mode
        </button>
        <button
          onClick={forceDarkMode}
          className="px-4 py-2 bg-blue-900 text-white rounded"
        >
          Force Dark Mode
        </button>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-gray-200 text-black rounded"
        >
          Refresh Page
        </button>
      </div>

      <div className="p-4 border rounded">
        <h2 className="text-xl mb-2">HTML Element Classes</h2>
        <pre className="bg-gray-100 dark:bg-gray-800 p-3 overflow-auto text-xs">
          {document.documentElement.classList.toString() || "(no classes)"}
        </pre>
      </div>
    </div>
  );
}
