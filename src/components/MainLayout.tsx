"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import ThemeToggle from "./ThemeToggle";
import Footer from "./Footer";
import { useUI } from "@/context/UIContext";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isNotFound } = useUI();
  
  const isAdminPage = pathname?.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  if (isLoginPage || isAdminPage || isNotFound) {
    return (
      <main style={{ width: '100%' }}>
        {!isAdminPage && <ThemeToggle className="floatingToggle" />}
        {children}
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className="contentWrapper">
        {children}
      </main>
      <Footer />
    </>
  );
}

