import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { locales, localeNames, Locale } from "@/i18n/config";
import Selector, { SelectorOption } from "./Selector";
import { useTranslation } from "@/hooks/useTranslation";

interface LanguageSelectorProps {
  className?: string;
}

// Fonction utilitaire pour obtenir l'emoji du drapeau
function getFlagEmoji(locale: Locale): string {
  const flagMap: Record<Locale, string> = {
    en: "🇺🇸",
    fr: "🇫🇷",
    de: "🇩🇪",
    es: "🇪🇸",
    it: "🇮🇹",
    pt: "🇵🇹",
  };
  return flagMap[locale] || "🌐";
}

export default function LanguageSelector({
  className = "",
}: LanguageSelectorProps) {
  const { locale, setLocale, isLoading } = useLanguage();
  const { t } = useTranslation();
  const languageOptions: SelectorOption<Locale>[] = locales.map((loc) => ({
    id: loc,
    name: localeNames[loc],
    icon: <span className="text-lg">{getFlagEmoji(loc)}</span>,
  }));

  return (
    <Selector
      className={className}
      options={languageOptions}
      value={locale}
      onChange={setLocale}
      placeholder={t("Choisir une langue")}
      disabled={isLoading}
      renderOption={(option) => (
        <>
          <span className="text-lg">{getFlagEmoji(option.id)}</span>
          <div className="flex-1 text-left">
            <div className="text-white text-sm">{option.name}</div>
          </div>
        </>
      )}
    />
  );
}
