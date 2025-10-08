import React, { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { CardSkin } from "@/enums/skins/SkinManager";
import { ThemeType } from "@/enums/themes/Theme";
import Card from "@/components/game/cards/card/Card";
import { CardState } from "@/components/game/cards/card/Card";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faTheaterMasks,
  faTree,
} from "@fortawesome/free-solid-svg-icons";

interface Collection {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  items: CollectionItem[];
  progress: number;
  totalItems: number;
  unlockedItems: number;
}

interface CollectionItem {
  id: string;
  type: "skin" | "theme";
  name: string;
  rarity: CardSkin["rarity"];
  unlocked: boolean;
  price?: number;
  skinId?: string;
  themeId?: ThemeType;
  preview?: string;
}

export default function Collections() {
  const { t } = useTranslation();
  const [selectedCollection, setSelectedCollection] = useState<string | null>(
    null
  );
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // const skins = getUnlockedSkins();
  // const themes = getAllThemes();

  // Define collections (in a real app, this would come from an API)
  const collections: Collection[] = [
    {
      id: "cyberpunk",
      name: "Cyberpunk Collection",
      description: "Style futuriste et néon",
      icon: <FontAwesomeIcon icon={faRobot} />,
      color: "from-purple-500 to-pink-500",
      progress: 75,
      totalItems: 8,
      unlockedItems: 6,
      items: [
        {
          id: "neon-skin",
          type: "skin",
          name: "Néon",
          rarity: "rare",
          unlocked: true,
          skinId: "neon",
        },
        {
          id: "cyber-skin",
          type: "skin",
          name: "Cyber",
          rarity: "legendary",
          unlocked: true,
          skinId: "cyber",
        },
        {
          id: "galaxy-skin",
          type: "skin",
          name: "Galaxy",
          rarity: "epic",
          unlocked: true,
          skinId: "galaxy",
        },
        {
          id: "neon-theme",
          type: "theme",
          name: "Neon Theme",
          rarity: "rare",
          unlocked: false,
          price: 300,
          themeId: ThemeType.NEON,
          preview: "from-cyan-500 to-purple-600",
        },
      ],
    },
    {
      id: "nature",
      name: "Nature Collection",
      description: "Inspiré par la nature et l'environnement",
      icon: <FontAwesomeIcon icon={faTree} />,
      color: "from-green-500 to-emerald-500",
      progress: 50,
      totalItems: 6,
      unlockedItems: 3,
      items: [
        {
          id: "forest-theme",
          type: "theme",
          name: "Forest",
          rarity: "common",
          unlocked: true,
          themeId: ThemeType.FOREST,
          preview: "from-emerald-500 to-teal-600",
        },
        {
          id: "ocean-theme",
          type: "theme",
          name: "Ocean",
          rarity: "common",
          unlocked: true,
          themeId: ThemeType.OCEAN,
          preview: "from-cyan-500 to-blue-600",
        },
        {
          id: "sunset-theme",
          type: "theme",
          name: "Sunset",
          rarity: "rare",
          unlocked: true,
          themeId: ThemeType.SUNSET,
          preview: "from-orange-500 to-pink-600",
        },
      ],
    },
    {
      id: "classic",
      name: "Classic Collection",
      description: "Styles classiques et intemporels",
      icon: <FontAwesomeIcon icon={faTheaterMasks} />,
      color: "from-gray-500 to-slate-500",
      progress: 100,
      totalItems: 4,
      unlockedItems: 4,
      items: [
        {
          id: "default-skin",
          type: "skin",
          name: "Défaut",
          rarity: "common",
          unlocked: true,
          skinId: "default",
        },
        {
          id: "classic-skin",
          type: "skin",
          name: "Classique",
          rarity: "common",
          unlocked: true,
          skinId: "classic",
        },
        {
          id: "purple-theme",
          type: "theme",
          name: "Purple",
          rarity: "common",
          unlocked: true,
          themeId: ThemeType.PURPLE,
          preview: "from-purple-600 to-blue-600",
        },
        {
          id: "monochrome-theme",
          type: "theme",
          name: "Monochrome",
          rarity: "common",
          unlocked: true,
          themeId: ThemeType.MONOCHROME,
          preview: "from-gray-600 to-slate-700",
        },
      ],
    },
  ];

  const getRarityColor = (rarity: CardSkin["rarity"]) => {
    switch (rarity) {
      case "common":
        return "border-gray-400 bg-gray-50";
      case "rare":
        return "border-blue-400 bg-blue-50";
      case "epic":
        return "border-purple-400 bg-purple-50";
      case "legendary":
        return "border-yellow-400 bg-yellow-50";
      default:
        return "border-gray-400 bg-gray-50";
    }
  };

  const getRarityBadge = (rarity: CardSkin["rarity"]) => {
    switch (rarity) {
      case "common":
        return "Commun";
      case "rare":
        return "Rare";
      case "epic":
        return "Épique";
      case "legendary":
        return "Légendaire";
      default:
        return "Commun";
    }
  };

  const handlePurchase = (item: CollectionItem) => {
    console.log(
      `Purchasing ${item.type}: ${item.name} for ${item.price} coins`
    );
  };

  const selectedCollectionData = collections.find(
    (c) => c.id === selectedCollection
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-4xl font-bold text-white mb-4">
            {t("Collections")}
          </h2>
          <p className="text-white/80 text-lg">
            {t("Explorez nos collections thématiques d'objets")}
          </p>
        </div>
        {selectedCollection && (
          <div>
            {/* Back Button */}
            <ActionButton
              onClick={() => setSelectedCollection(null)}
              label={t("← Retour aux collections")}
              color={{ color: ColorType.TRANSPARENT }}
            />
          </div>
        )}
      </div>

      {!selectedCollection ? (
        /* Collections Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:border-white/40 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedCollection(collection.id)}
            >
              {/* Collection Header */}
              <div className="text-center mb-6">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${collection.color} flex items-center justify-center text-3xl`}
                >
                  {collection.icon}
                </div>
                <h3 className="text-white font-bold text-xl mb-2">
                  {collection.name}
                </h3>
                <p className="text-white/70 text-sm">
                  {collection.description}
                </p>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white/80 text-sm">
                    {t("Progression")}
                  </span>
                  <span className="text-white font-bold">
                    {collection.unlockedItems}/{collection.totalItems}
                  </span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div
                    className={`bg-gradient-to-r ${collection.color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${collection.progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Collection Stats */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/60">{t("Objets débloqués")}</span>
                <span className="text-white font-bold">
                  {Math.round(collection.progress)}%
                </span>
              </div>

              {/* Hover Effect */}
              <div className="mt-4 transition-opacity duration-300">
                <ActionButton
                  onClick={() => setSelectedCollection(collection.id)}
                  label={t("Explorer")}
                  color={{ color: ColorType.PRIMARY }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Collection Details */
        <div className="space-y-6">
          {/* Collection Header */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`w-16 h-16 rounded-full bg-gradient-to-r ${selectedCollectionData?.color} flex items-center justify-center text-3xl`}
              >
                {selectedCollectionData?.icon}
              </div>
              <div>
                <h3 className="text-white font-bold text-2xl">
                  {selectedCollectionData?.name}
                </h3>
                <p className="text-white/70">
                  {selectedCollectionData?.description}
                </p>
              </div>
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/80">
                  {t("Progression de la collection")}
                </span>
                <span className="text-white font-bold">
                  {selectedCollectionData?.unlockedItems}/
                  {selectedCollectionData?.totalItems}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div
                  className={`bg-gradient-to-r ${selectedCollectionData?.color} h-3 rounded-full transition-all duration-500`}
                  style={{ width: `${selectedCollectionData?.progress}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Collection Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {selectedCollectionData?.items.map((item) => (
              <div
                key={item.id}
                className={`relative bg-white/10 backdrop-blur-lg rounded-xl p-4 border-2 transition-all duration-300 ${
                  hoveredItem === item.id
                    ? "scale-105 shadow-lg"
                    : "border-white/20 hover:border-white/40"
                } ${getRarityColor(item.rarity)} ${item.unlocked ? "opacity-100" : "opacity-60"}`}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Rarity Badge */}
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded-full ${
                      item.rarity === "common"
                        ? "bg-gray-200 text-gray-700"
                        : item.rarity === "rare"
                          ? "bg-blue-200 text-blue-700"
                          : item.rarity === "epic"
                            ? "bg-purple-200 text-purple-700"
                            : "bg-yellow-200 text-yellow-700"
                    }`}
                  >
                    {getRarityBadge(item.rarity)}
                  </span>
                </div>

                {/* Unlocked Badge */}
                {item.unlocked && (
                  <div className="absolute top-2 left-2">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
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
                    </div>
                  </div>
                )}

                {/* Item Preview */}
                <div className="flex justify-center mb-3">
                  {item.type === "skin" && item.skinId ? (
                    <div className="w-16 h-20">
                      <Card
                        cardState={CardState.CARD_BACK}
                        size="small"
                        skinId={item.skinId}
                      />
                    </div>
                  ) : item.type === "theme" && item.preview ? (
                    <div
                      className={`w-16 h-20 rounded-lg bg-gradient-to-r ${item.preview} border-2 border-white/30`}
                    ></div>
                  ) : (
                    <div className="w-16 h-20 bg-gray-300 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🎨</span>
                    </div>
                  )}
                </div>

                {/* Item Info */}
                <div className="text-center">
                  <h4 className="text-white font-semibold text-sm mb-1">
                    {item.name}
                  </h4>
                  {!item.unlocked && item.price && (
                    <div className="mt-2">
                      <span className="text-yellow-400 font-bold text-sm">
                        {item.price} coins
                      </span>
                      <ActionButton
                        onClick={() => handlePurchase(item)}
                        label={t("Acheter")}
                        color={{ color: ColorType.PRIMARY }}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
