"use client";
import { usePathname } from "next/navigation";
import NavHead from "./Navhead";

const noHeaderRoutes = ["/"]; // Add routes where you want NO header

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const showHeader = !noHeaderRoutes?.includes(pathname);

  return (
    <>
      {showHeader && <NavHead />}
      <main className="w-full h-full no-scrollbar">{children}</main>
    </>
  );
};

export default Layout;
