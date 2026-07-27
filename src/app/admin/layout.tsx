import { Inter } from "next/font/google";
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import styles from './admin.module.css';
import { Providers } from '@/components/Providers';
import { LanguageProvider } from '@/context/LanguageContext';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Admin Panel - Starpack Indahmaju</title>
        <script
          id="theme-initializer"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
                  if (!theme && supportDarkMode) theme = 'dark';
                  if (!theme) theme = 'light';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <LanguageProvider initialLang="en">
          <Providers>
            <div className={styles.layoutWrapper}>
              <AdminSidebar />
              <main className={styles.mainContent}>
                <AdminHeader />
                {children}
              </main>
            </div>
          </Providers>
        </LanguageProvider>
      </body>
    </html>
  );
}
