"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('id'); // Default to Indonesian

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    
    if (savedLang && translations[savedLang]) {
      setLanguageState(savedLang);
    } else {
      // Auto-detect browser language
      const browserLang = navigator.language.split('-')[0] as any;
      const supportedLangs: Language[] = ['en', 'id', 'zh', 'jp'];
      
      if (supportedLangs.includes(browserLang)) {
        setLanguageState(browserLang);
        localStorage.setItem('language', browserLang);
      } else {
        setLanguageState('id'); // Fallback to Indonesian
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language];

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
