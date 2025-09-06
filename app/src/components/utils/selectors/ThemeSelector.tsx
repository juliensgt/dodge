import React, { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { ThemeType } from "@/enums/themes/Theme";

interface ThemeSelectorProps {
  className?: string;
}

export default function ThemeSelector({ className = "" }: ThemeSelectorProps) {
  const { currentTheme, setTheme, availableThemes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (themeId: ThemeType) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  const currentThemeData = availableThemes.find(
    (theme) => theme.id === currentTheme
  );

  return (
    <div className={`relative ${className}`}>
      {/* Bouton de sélection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center gap-3 px-4 py-2 rounded-lg
          bg-gradient-to-r ${currentThemeData?.preview}
          text-white font-medium
          hover:scale-105 transition-transform duration-200
          shadow-lg
        `}
      >
        <div className="w-4 h-4 rounded-full bg-white/20"></div>
        <span>{currentThemeData?.name}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Menu déroulant */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-52 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-xl z-50">
          <div className="p-2">
            <div className="text-white/70 text-sm font-medium mb-2 px-2">
              Choisir un thème
            </div>
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-md
                  transition-all duration-200
                  ${
                    currentTheme === theme.id
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${theme.preview}`}
                ></div>
                <div className="flex-1 text-left">
                  <div className="text-white font-medium">{theme.name}</div>
                </div>
                {currentTheme === theme.id && (
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Overlay pour fermer le menu */}
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}
    </div>
  );
}
