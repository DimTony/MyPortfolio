"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Only show the toggle after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with the same dimensions to avoid layout shift
    return <div className="w-[65px] h-[36px]" aria-hidden="true" />;
  }

  return (
    <div className="toggle toggle--daynight">
      <input
        type="checkbox"
        id="toggle--daynight"
        className="toggle--checkbox"
        checked={resolvedTheme === "light"}
        onChange={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      />
      <label className="toggle--btn" htmlFor="toggle--daynight">
        <span className="toggle--feature"></span>
      </label>
    </div>
  );
}
