import React, { createContext, useContext, useState, useEffect } from "react";
import { Locale, locales, defaultLocale } from "@/i18n/config";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  translations: Record<string, string>;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const setLocale = async (newLocale: Locale) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/locales/${newLocale}/common.json`);
      if (response.ok) {
        const data = await response.json();
        setTranslations(data);
        setLocaleState(newLocale);
        localStorage.setItem("preferred-locale", newLocale);
      }
    } catch (error) {
      console.error("Failed to load translations:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialLocale = async () => {
      const savedLocale = localStorage.getItem("preferred-locale") as Locale;
      const initialLocale =
        savedLocale && locales.includes(savedLocale)
          ? savedLocale
          : defaultLocale;

      try {
        const response = await fetch(`/locales/${initialLocale}/common.json`);
        if (response.ok) {
          const data = await response.json();
          setTranslations(data);
          setLocaleState(initialLocale);
        }
      } catch (error) {
        console.error("Failed to load initial translations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialLocale();
  }, []);

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale, translations, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
