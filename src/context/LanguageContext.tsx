"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import en from '../locales/en.json';
import id from '../locales/id.json';
import zh from '../locales/zh.json';
import jp from '../locales/jp.json';

type Translations = typeof en;

type Language = 'en' | 'id' | 'zh' | 'jp';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const translations = { en, id, zh, jp };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface ProviderProps {
  children: React.ReactNode;
  initialLang?: Language;
}

export const LanguageProvider: React.FC<ProviderProps> = ({ children, initialLang = 'id' }) => {
  const [language, setLanguageState] = useState<Language>(initialLang);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If the server provided an initialLang (via i18n routing), use it.
    if (initialLang && translations[initialLang]) {
      setLanguageState(initialLang);
    }
  }, [initialLang]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    
    // Redirect to the new language route
    if (pathname) {
      const segments = pathname.split('/');
      // The first segment is empty string (because it starts with /)
      // The second segment is the current language code
      segments[1] = lang;
      router.push(segments.join('/') || '/');
    }
  };

  const t = translations[language] || translations.id;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
