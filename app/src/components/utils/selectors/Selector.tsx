import React, { useState, ReactNode } from "react";

export interface SelectorOption<T = string> {
  id: T;
  name: string;
  icon?: ReactNode;
  preview?: string;
}

interface SelectorProps<T = string> {
  className?: string;
  options: SelectorOption<T>[];
  value: T;
  onChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  buttonClassName?: string;
  menuClassName?: string;
  renderOption?: (option: SelectorOption<T>, isSelected: boolean) => ReactNode;
}

export default function Selector<T = string>({
  className = "",
  options,
  value,
  onChange,
  placeholder = "Sélectionner",
  disabled = false,
  buttonClassName = "",
  menuClassName = "",
  renderOption,
}: SelectorProps<T>) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (optionId: T) => {
    onChange(optionId);
    setIsOpen(false);
  };

  const currentOption = options.find((option) => option.id === value);

  const defaultButtonClassName = `
    flex items-center gap-3 px-4 py-2 rounded-lg
    bg-gradient-to-r from-blue-500 to-purple-600
    text-white font-medium
    hover:scale-105 transition-transform duration-200
    shadow-lg
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
  `;

  const defaultMenuClassName = `
    absolute top-full left-0 mt-2 w-42 
    bg-white/10 backdrop-blur-md border border-white/20 
    rounded-lg shadow-xl z-50
  `;

  return (
    <div className={`relative ${className}`}>
      {/* Bouton de sélection */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={`${defaultButtonClassName} ${buttonClassName}`}
      >
        {currentOption?.icon && (
          <div className="flex items-center justify-center">
            {currentOption.icon}
          </div>
        )}
        <span>{currentOption?.name || placeholder}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
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
        <div className={`${defaultMenuClassName} ${menuClassName}`}>
          <div className="p-2">
            <div className="text-white/70 mb-2 px-2 text-sm">{placeholder}</div>
            {options.map((option) => {
              const isSelected = value === option.id;
              return (
                <button
                  key={String(option.id)}
                  onClick={() => handleChange(option.id)}
                  disabled={disabled}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-md
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${isSelected ? "bg-white/20" : "hover:bg-white/10"}
                  `}
                >
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <>
                      {option.icon && (
                        <div className="flex items-center justify-center">
                          {option.icon}
                        </div>
                      )}
                      <div className="flex-1 text-left">
                        <div className="text-white text-sm">{option.name}</div>
                      </div>
                      {isSelected && (
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
                    </>
                  )}
                </button>
              );
            })}
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
