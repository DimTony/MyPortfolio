"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

const NavHead = () => {
  const pathname = usePathname();

  return (
    <header
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 rounded-full px-6 py-3 flex items-center gap-6"
      style={{
        backgroundColor: "var(--glassmorph-nav-bg)",
        backdropFilter: `blur(var(--glassmorph-blur))`,
        border: `1px solid var(--glassmorph-nav-border)`,
        boxShadow: "var(--glassmorph-shadow)",
        transition: "all 0.3s ease",
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <span
              // style={{
              //   color: "var(--resume-foreground)",
              // }}
              //   className={clsx(
              //     "relative font-medium transition duration-300 px-3 py-1 rounded-md"
              //   )}
              className={`relative font-medium transition duration-300 px-3 py-1 rounded-md ${
                isActive ? "neon" : ""
              }`}
              //   style={{
              //     // color: isActive
              //     //   ? "var(--glassmorph-accent)"
              //     //   : "var(--glassmorph-text-primary)",
              //     color: "var(--foreground)",
              //     textShadow: isActive ? "var(--glassmorph-active-glow)" : "none",
              //     backgroundColor: isActive
              //       ? "var(--glassmorph-active-bg)"
              //       : "transparent",
              //     backdropFilter: isActive
              //       ? `blur(var(--glassmorph-blur))`
              //       : "none",
              //     // border: isActive
              //     //   ? `1px solid var(--glassmorph-border)`
              //     //   : "none",
              //     transition: "all 0.3s ease",
              //   }}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
      <div className="ml-2">
        <ThemeToggle />
      </div>
    </header>
  );
};

export default NavHead;
