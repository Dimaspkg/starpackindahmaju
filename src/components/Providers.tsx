"use client";

import { SessionProvider } from "next-auth/react";
import { UIProvider } from "@/context/UIContext";
import { NotificationProvider } from "@/context/NotificationContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <UIProvider>
        <NotificationProvider>
          {children}
        </NotificationProvider>
      </UIProvider>
    </SessionProvider>
  );
}
