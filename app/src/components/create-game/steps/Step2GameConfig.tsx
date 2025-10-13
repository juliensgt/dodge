import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  faGear,
  faGamepad,
  faCog,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { StepProps, DeckType } from "../types";
import { deckPresets } from "../constants";
import {
  getModeDeJeuFromDeckType,
  getDeckTypeFromModeDeJeu,
  isDeckSelected as checkDeckSelected,
} from "../utils/deckMapping";
import Image from "next/image";

// Reusable components
interface FormSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  title,
  icon,
  children,
  className = "",
}) => {
  const isMobile = useIsMobile();

  return (
    <div
      className={`bg-white/10 backdrop-blur-sm rounded-2xl ${isMobile ? "p-4" : "p-6"} border border-white/20 ${className}`}
    >
      <h3
        className={`${isMobile ? "text-lg" : "text-xl"} font-semibold text-white ${isMobile ? "mb-3" : "mb-4"} flex items-center gap-2`}
      >
        {icon}
        {title}
      </h3>
      {children}
    </div>
  );
};

interface FormFieldProps {
  label: string;
  type?: string;
  min?: number;
  max?: number;
  value: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  min,
  max,
  value,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const inputClasses = isMobile
    ? "w-full px-3 py-2 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 text-sm"
    : "w-full px-4 py-3 bg-white/10 backdrop-blur-sm rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200";
  const labelClasses = isMobile
    ? "block text-xs font-medium text-white/90 mb-1"
    : "block text-sm font-medium text-white/90 mb-2";

  return (
    <div>
      <label className={labelClasses}>{t(label)}</label>
      <input
        type={type}
        min={min}
        max={max}
        value={value}
        onChange={(e) =>
          onChange(
            type === "number" ? parseInt(e.target.value) : e.target.value
          )
        }
        placeholder={placeholder ? t(placeholder) : undefined}
        disabled={disabled}
        className={inputClasses}
      />
    </div>
  );
};

interface DeckCardProps {
  deck: {
    id: DeckType;
    name: string;
    description: string;
    icon: string;
    color: string;
    cardCount: number;
    disabled?: boolean;
  };
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const DeckCard: React.FC<DeckCardProps> = ({
  deck,
  isSelected,
  onSelect,
  index,
}) => {
  const isMobile = useIsMobile();

  const getCardStyles = () => {
    const baseStyles = `group relative ${isMobile ? "p-3" : "p-4"} rounded-xl border-2 transition-all duration-300 transform`;

    if (deck.disabled || deck.id === DeckType.CUSTOM) {
      const opacityValue = Math.max(20, 50 - index * 10);
      return `${baseStyles} opacity-${opacityValue} cursor-not-allowed border-white/20 bg-white/5`;
    }

    if (isSelected) {
      const colorMap = {
        blue: "border-blue-400 bg-blue-500/20 shadow-lg",
        purple: "border-purple-400 bg-purple-500/20 shadow-lg",
        yellow: "border-yellow-400 bg-yellow-500/20 shadow-lg",
        gray: "border-gray-400 bg-gray-500/20 shadow-lg",
      };
      return `${baseStyles} ${colorMap[deck.color as keyof typeof colorMap] || colorMap.gray}`;
    }

    return `${baseStyles} border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/30`;
  };

  const getIconStyles = () => {
    if (deck.disabled || deck.id === DeckType.CUSTOM) {
      return "from-gray-500/70 to-gray-600/70";
    }

    const colorMap = {
      blue: "from-blue-500/70 to-blue-600/70",
      purple: "from-purple-500/70 to-purple-600/70",
      yellow: "from-yellow-500/70 to-yellow-600/70",
      gray: "from-gray-500/70 to-gray-600/70",
    };

    return colorMap[deck.color as keyof typeof colorMap] || colorMap.gray;
  };

  return (
    <div className="relative h-full">
      <button
        onClick={onSelect}
        className={`${getCardStyles()} h-full`}
        disabled={deck.disabled || deck.id === DeckType.CUSTOM}
      >
        <div
          className={`flex flex-col items-center text-center ${isMobile ? "space-y-2" : "space-y-3"}`}
        >
          <div
            className={`p-1 rounded-xl bg-gradient-to-r ${getIconStyles()} shadow-lg group-hover:scale-110 transition-transform duration-300`}
          >
            <Image src={deck.icon} alt={deck.name} width={56} height={56} />
          </div>
          <div>
            <h4
              className={`font-bold text-white ${isMobile ? "text-xs" : "text-sm"} ${isMobile ? "mb-0.5" : "mb-1"}`}
            >
              {deck.name}
            </h4>
            <p
              className={`text-white/70 ${isMobile ? "text-xs" : "text-xs"} leading-relaxed`}
            >
              {deck.description}
            </p>
            {deck.id !== DeckType.CUSTOM && (
              <div
                className={`text-white/60 ${isMobile ? "text-xs" : "text-xs"} font-mono ${isMobile ? "mt-0.5" : "mt-1"}`}
              >
                {deck.cardCount} cartes
              </div>
            )}
          </div>
        </div>
      </button>
      {(deck.disabled || deck.id === DeckType.CUSTOM) && (
        <div className="absolute -top-1 -right-1 z-50">
          <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold shadow-lg">
            Bientôt disponible
          </div>
        </div>
      )}
    </div>
  );
};

interface DeckDetailsProps {
  deckType: DeckType;
}

const DeckDetails: React.FC<DeckDetailsProps> = ({ deckType }) => {
  const isMobile = useIsMobile();

  const getGradientStyles = () => {
    const gradientMap = {
      [DeckType.STANDARD]: "from-blue-500/10 to-blue-600/10",
      [DeckType.ADVANCED]: "from-purple-500/10 to-purple-600/10",
      [DeckType.ULTIMATE]: "from-yellow-500/10 to-yellow-600/10",
      [DeckType.CUSTOM]: "from-gray-500/10 to-gray-600/10",
    };
    return gradientMap[deckType] || gradientMap[DeckType.CUSTOM];
  };

  const getIconColor = () => {
    const colorMap = {
      [DeckType.STANDARD]: "text-blue-400",
      [DeckType.ADVANCED]: "text-purple-400",
      [DeckType.ULTIMATE]: "text-yellow-400",
      [DeckType.CUSTOM]: "text-gray-400",
    };
    return colorMap[deckType] || colorMap[DeckType.CUSTOM];
  };

  const getDotColor = () => {
    const colorMap = {
      [DeckType.STANDARD]: "bg-blue-400",
      [DeckType.ADVANCED]: "bg-purple-400",
      [DeckType.ULTIMATE]: "bg-yellow-400",
      [DeckType.CUSTOM]: "bg-gray-400",
    };
    return colorMap[deckType] || colorMap[DeckType.CUSTOM];
  };

  const getDeckDetails = () => {
    switch (deckType) {
      case DeckType.STANDARD:
        return [
          "52 cartes classiques (2-10, Valet, Dame, Roi, As)",
          "4 couleurs: Cœur, Carreau, Trèfle, Pique",
          "Parfait pour débuter",
        ];
      case DeckType.ADVANCED:
        return [
          "58 cartes au total",
          "52 cartes classiques + 6 cartes spéciales",
          "Cartes spéciales: Joker, Wild, Skip, Reverse",
          "Plus de stratégie et de variété",
        ];
      case DeckType.ULTIMATE:
        return [
          "64 cartes au total",
          "52 cartes classiques + 12 cartes spéciales",
          "Toutes les cartes spéciales disponibles",
          "Cartes uniques: Dragon, Phoenix, Magic",
          "Pour les joueurs expérimentés",
        ];
      default:
        return [];
    }
  };

  return (
    <div
      className={`mt-4 ${isMobile ? "p-3" : "p-4"} bg-gradient-to-r ${getGradientStyles()} backdrop-blur-sm rounded-xl border border-white/20`}
    >
      <div
        className={`flex items-center justify-between ${isMobile ? "mb-2" : "mb-3"}`}
      >
        <h4
          className={`text-white font-semibold flex items-center gap-2 ${isMobile ? "text-sm" : ""}`}
        >
          <FontAwesomeIcon
            icon={faInfoCircle}
            className={`${getIconColor()} ${isMobile ? "text-sm" : ""}`}
          />
          {deckPresets.find((d) => d.id === deckType)?.name} - Détails
        </h4>
      </div>

      <div className={`space-y-2 ${isMobile ? "space-y-1" : ""}`}>
        {getDeckDetails().map((detail, index) => (
          <p
            key={index}
            className={`text-white/80 ${isMobile ? "text-xs" : "text-sm"} flex items-center gap-2`}
          >
            <span
              className={`${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"} ${getDotColor()} rounded-full`}
            ></span>
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
};

interface ToggleSwitchProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  description,
  checked,
  onChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="p-4 bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-sm rounded-xl border border-white/20">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="flex-1">
          <div className="text-white font-semibold text-sm mb-1">
            {t(label)}
          </div>
          <div className="text-white/70 text-xs">{t(description)}</div>
        </div>
        <div
          className={`w-12 h-6 rounded-full transition-colors duration-200 ${
            checked ? "bg-orange-500" : "bg-white/20"
          }`}
          onClick={() => onChange(!checked)}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-200 ${
              checked ? "translate-x-6" : "translate-x-0.5"
            } mt-0.5`}
          ></div>
        </div>
      </label>
    </div>
  );
};

export default function Step2GameConfig({ formData, setFormData }: StepProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const handleInputChange = (
    field: keyof typeof formData,
    value: string | number | boolean
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  // Helper function to check if a deck is selected based on modeDeJeu
  const isDeckSelected = (deck: { id: DeckType }): boolean => {
    return checkDeckSelected(deck, formData.modeDeJeu);
  };

  // Helper function to get the current deck type from modeDeJeu
  const getCurrentDeckType = (): DeckType => {
    return getDeckTypeFromModeDeJeu(formData.modeDeJeu);
  };

  const handleDeckSelect = (deck: {
    id: DeckType;
    name: string;
    description: string;
    icon: string;
    color: string;
    cardCount: number;
    disabled?: boolean;
  }) => {
    // Don't allow selection of disabled decks
    if (deck.disabled) {
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      modeDeJeu: getModeDeJeuFromDeckType(deck.id),
      nbCardsPerPlayer:
        deck.id !== DeckType.CUSTOM
          ? deck.cardCount
          : prevFormData.nbCardsPerPlayer,
    }));
  };

  return (
    <div className={`space-y-${isMobile ? "4" : "6"}`}>
      {/* Header */}
      <div className="text-center">
        <h2
          className={`${isMobile ? "text-xl" : "text-3xl"} font-bold text-white mb-2`}
        >
          {t("Configuration de la partie")}
        </h2>
        <p className={`text-white/70 ${isMobile ? "text-sm" : "text-lg"}`}>
          {t("Configurez les paramètres de base de votre partie")}
        </p>
      </div>

      {/* Hierarchical Grid Layout */}
      <div
        className={`grid grid-cols-1 ${isMobile ? "gap-4" : "lg:grid-cols-12 gap-6"} items-start`}
      >
        {/* Left Column - Game Settings */}
        <div
          className={`${isMobile ? "space-y-4" : "lg:col-span-5 space-y-6"}`}
        >
          {/* General Options */}
          <FormSection
            title={t("Options générales")}
            icon={
              <FontAwesomeIcon
                icon={faGear}
                className={`text-blue-400 ${isMobile ? "text-lg" : ""}`}
              />
            }
          >
            <div className="space-y-4">
              <FormField
                label="Nombre de joueurs"
                type="number"
                min={2}
                max={6}
                value={formData.maxPlayers}
                onChange={(value) => handleInputChange("maxPlayers", value)}
              />
              <FormField
                label="Nombre de cartes par joueur"
                type="number"
                min={1}
                max={4}
                value={formData.nbCardsPerPlayer}
                onChange={(value) =>
                  handleInputChange("nbCardsPerPlayer", value)
                }
              />
            </div>
          </FormSection>

          {/* Deck Selection */}
          <FormSection
            title={t("Deck de cartes")}
            icon={
              <FontAwesomeIcon
                icon={faGamepad}
                className={`text-purple-400 ${isMobile ? "text-lg" : ""}`}
              />
            }
          >
            <div className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium text-white/90 mb-2`}
                >
                  {t("Type de deck")}
                </label>
                <div
                  className={`grid ${isMobile ? "grid-cols-2" : "grid-cols-2"} gap-3 items-stretch`}
                >
                  {deckPresets.map((deck, index) => (
                    <DeckCard
                      key={deck.id}
                      deck={deck}
                      isSelected={isDeckSelected(deck)}
                      onSelect={() => handleDeckSelect(deck)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
              <DeckDetails deckType={getCurrentDeckType()} />
            </div>
          </FormSection>
        </div>

        {/* Right Column - Game Phases */}
        <div
          className={`${isMobile ? "space-y-4" : "lg:col-span-7 space-y-6"}`}
        >
          {/* Game Phases - Each on its own line */}
          <div className="space-y-4">
            {/* Phase 1: Game Start */}
            <FormSection
              title={t("Phase de début de partie")}
              icon={
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  1
                </div>
              }
            >
              <FormField
                label="Temps de début de partie (secondes)"
                type="number"
                min={5}
                max={60}
                value={formData.timeToStartGame}
                onChange={(value) =>
                  handleInputChange("timeToStartGame", value)
                }
              />
            </FormSection>

            {/* Phase 2: Card Peek */}
            <FormSection
              title={t("Phase coup d'oeil")}
              icon={
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  2
                </div>
              }
            >
              <div className="space-y-4">
                <FormField
                  label="Temps de coup d'oeil (secondes)"
                  type="number"
                  min={5}
                  max={60}
                  value={formData.timeToSeeCards}
                  onChange={(value) =>
                    handleInputChange("timeToSeeCards", value)
                  }
                />
                <FormField
                  label="Nombre de cartes à voir (secondes)"
                  type="number"
                  min={5}
                  max={60}
                  value={formData.nbSeeFirstCards}
                  onChange={(value) =>
                    handleInputChange("nbSeeFirstCards", value)
                  }
                />
              </div>
            </FormSection>

            {/* Phase 3: Game Play */}
            <FormSection
              title={t("Phase pendant la partie")}
              icon={
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  3
                </div>
              }
            >
              <FormField
                label="Temps de jeu de chaque joueur (secondes)"
                type="number"
                min={5}
                max={60}
                value={formData.timeToPlay}
                onChange={(value) => handleInputChange("timeToPlay", value)}
              />
            </FormSection>
          </div>

          {/* Privacy Settings */}
          <FormSection
            title={t("Confidentialité")}
            icon={
              <FontAwesomeIcon
                icon={faCog}
                className={`text-orange-400 ${isMobile ? "text-lg" : ""}`}
              />
            }
          >
            <div className="space-y-4">
              <ToggleSwitch
                label="Partie privée"
                description="Seuls les joueurs avec le mot de passe peuvent rejoindre"
                checked={formData.privateGame}
                onChange={(checked) =>
                  handleInputChange("privateGame", checked)
                }
              />

              {formData.privateGame && (
                <div className="p-4 bg-gradient-to-r from-orange-500/5 to-red-500/5 backdrop-blur-sm rounded-xl border border-orange-500/20 animate-fadeIn">
                  <FormField
                    label="Mot de passe"
                    type="password"
                    value={formData.password || ""}
                    onChange={(value) => handleInputChange("password", value)}
                    placeholder="Entrez un mot de passe"
                  />
                  <p className="text-white/60 text-xs mt-2">
                    {t(
                      "Choisissez un mot de passe fort pour sécuriser votre partie"
                    )}
                  </p>
                </div>
              )}
            </div>
          </FormSection>
        </div>
      </div>
    </div>
  );
}
