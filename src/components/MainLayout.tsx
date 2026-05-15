"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  if (isLoginPage || isAdminPage) {
    return (
      <main style={{ width: '100%' }}>
        {!isAdminPage && <ThemeToggle className="floatingToggle" />}
        {children}
      </main>
    );
  }

  return (
    <div className="mainContainer">
      <Sidebar />
      <main className="contentWrapper">
        <ThemeToggle className="floatingToggle" />
        {children}
      </main>
    </div>
  );
}
