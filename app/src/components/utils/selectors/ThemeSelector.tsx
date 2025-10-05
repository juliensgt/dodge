import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeType } from "@/enums/themes/Theme";
import Selector, { SelectorOption } from "./Selector";
import { useTranslation } from "@/hooks/useTranslation";

interface ThemeSelectorProps {
  className?: string;
}

export default function ThemeSelector({ className = "" }: ThemeSelectorProps) {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const { t } = useTranslation();
  const themeOptions: SelectorOption<ThemeType>[] = availableThemes.map(
    (theme) => ({
      id: theme.id,
      name: theme.name,
      icon: <div className="w-3 h-3 rounded-full bg-white/20"></div>,
      preview: theme.preview,
    })
  );

  const currentThemeData = availableThemes.find(
    (theme) => theme.id === currentTheme
  );

  return (
    <Selector
      className={className}
      options={themeOptions}
      value={currentTheme}
      onChange={setTheme}
      placeholder={t("Choisir un thème")}
      buttonClassName={`bg-gradient-to-r ${currentThemeData?.preview}`}
      renderOption={(option) => (
        <>
          <div
            className={`w-4 h-4 rounded-full bg-gradient-to-r ${option.preview}`}
          ></div>
          <div className="flex-1 text-left">
            <div className="text-white text-sm">{option.name}</div>
          </div>
        </>
      )}
    />
  );
}
