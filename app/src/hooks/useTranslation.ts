import { useLanguage } from "@/contexts/LanguageContext";

export function useTranslation() {
  const { translations } = useLanguage();

  const t = (key: string, fallback?: string): string => {
    return translations[key] || fallback || key;
  };

  return { t };
}
