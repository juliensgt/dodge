import React from "react";
import { useCollection } from "@/contexts/CollectionContext";
import { ThemeType } from "@/enums/themes/Theme";
import Selector, { SelectorOption } from "./Selector";
import { useTranslation } from "@/hooks/useTranslation";
import { getAllThemes } from "@/enums/themes/ThemeManager";
import { GradientType } from "@/enums/themes/list/PurpleTheme";

interface ThemeSelectorProps {
  className?: string;
}

export default function ThemeSelector({ className = "" }: ThemeSelectorProps) {
  const { getCurrentTheme, setTheme } = useCollection();
  const { t } = useTranslation();
  const allThemes = getAllThemes();
  const themeOptions: SelectorOption<ThemeType>[] = allThemes.map((theme) => ({
    id: theme.id,
    name: theme.name,
    icon: <div className="w-3 h-3 rounded-full bg-white/20"></div>,
    preview: theme.preview,
  }));

  return (
    <Selector
      className={className}
      options={themeOptions}
      value={getCurrentTheme().getThemeType()}
      onChange={setTheme}
      placeholder={t("Choisir un thème")}
      buttonClassName={`bg-gradient-to-r ${getCurrentTheme().getGradient(GradientType.PRIMARY, "to-r")}`}
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
