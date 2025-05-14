// "use client";

// import { useEffect, useState } from "react";
// import { useTheme } from "next-themes";

// export default function ThemeToggle() {
//   const [mounted, setMounted] = useState(false);
//   const { resolvedTheme, setTheme } = useTheme();

//   // Only show the UI after hydration to prevent hydration mismatch
//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) {
//     // Return a placeholder with the same dimensions to avoid layout shift
//     return <div className="w-[65px] h-[36px]" aria-hidden="true" />;
//   }

//   return (
//     <div className="toggle toggle--daynight">
//       <input
//         type="checkbox"
//         id="toggle--daynight"
//         className="toggle--checkbox"
//         checked={resolvedTheme === "dark"}
//         onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
//       />
//       <label className="toggle--btn" htmlFor="toggle--daynight">
//         <span className="toggle--feature"></span>
//       </label>
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();

  // Only show UI after mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);

    // Debug: Log theme status when component mounts
    console.log("Theme mounted:", {
      resolvedTheme,
      theme,
      isDarkMode: document.documentElement.classList.contains("dark"),
    });
  }, [resolvedTheme, theme]);

  // Debug: Add a theme change detector
  useEffect(() => {
    if (!mounted) return;

    console.log("Theme changed:", {
      resolvedTheme,
      theme,
      isDarkMode: document.documentElement.classList.contains("dark"),
    });
  }, [mounted, resolvedTheme, theme]);

  // Toggle function that also logs
  const toggleTheme = () => {
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    console.log("Setting theme to:", newTheme);
    setTheme(newTheme);
  };

  if (!mounted) {
    return <div className="w-[65px] h-[36px]" aria-hidden="true" />;
  }

  return (
    <div className="toggle toggle--daynight">
      <input
        type="checkbox"
        id="toggle--daynight"
        className="toggle--checkbox"
        checked={resolvedTheme === "dark"}
        onChange={toggleTheme}
      />
      <label className="toggle--btn" htmlFor="toggle--daynight">
        <span className="toggle--feature"></span>
      </label>
    </div>
  );
}