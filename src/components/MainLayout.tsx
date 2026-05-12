"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import ThemeToggle from "./ThemeToggle";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  if (isLoginPage) {
    return (
      <main style={{ width: '100%' }}>
        <ThemeToggle className="floatingToggle" />
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
