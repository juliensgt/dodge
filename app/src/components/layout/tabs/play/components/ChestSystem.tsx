import { motion } from "framer-motion";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

type ChestType = "bronze" | "silver" | "gold" | "diamond";
enum ChestState {
  LOCKED = "LOCKED",
  UNLOCKED = "UNLOCKED",
}

interface Chest {
  id: number;
  type: ChestType;
  unlockDate: Date;
  state: ChestState;
}

interface ChestSystemProps {
  chests: Chest[];
  currentTime: dayjs.Dayjs;
  isMobile: boolean;
  padding: string;
  maxWidth: string;
}

export default function ChestSystem({
  chests,
  currentTime,
  isMobile,
  padding,
  maxWidth,
}: ChestSystemProps) {
  const getChestState = (chestId: number): string | undefined => {
    const chest = chests.find((chest) => chest.id === chestId);
    if (chest?.state === ChestState.LOCKED) {
      if (chest?.type === "bronze") return "8h";
      if (chest?.type === "silver") return "12h";
      if (chest?.type === "gold") return "24h";
      if (chest?.type === "diamond") return "48h";
    }
    return undefined;
  };

  const getTimeRemaining = (chestId: number): string | undefined => {
    const chest = chests.find((chest) => chest.id === chestId);
    if (chest?.state === ChestState.UNLOCKED) {
      const diff = dayjs(chest?.unlockDate).diff(currentTime);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      if (days > 0) {
        return `${days}j ${hours}h`;
      } else if (hours > 0) {
        return `${hours}h ${minutes}min`;
      } else if (minutes > 0) {
        return `${minutes}min`;
      } else {
        return undefined;
      }
    }
    return undefined;
  };

  const getChestTypeName = (type: ChestType): string => {
    const names = {
      bronze: "Bronze",
      silver: "Argent",
      gold: "Or",
      diamond: "Diamant",
    };
    return names[type];
  };

  const getButtonConfig = (chest: Chest) => {
    const isUnlocked = chest.state === ChestState.UNLOCKED;
    const hasTimeRemaining = getTimeRemaining(chest.id);
    const isReadyToOpen = isUnlocked && !hasTimeRemaining;
    const isPurchasable = isUnlocked && hasTimeRemaining;

    if (isReadyToOpen) {
      return {
        className:
          "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-md",
        text: "Ouvrir",
        disabled: false,
      };
    } else if (isPurchasable) {
      return {
        className:
          "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md",
        text: "Débloquer",
        disabled: false,
      };
    } else {
      return {
        className: "bg-white/20 text-white/70",
        text: getChestState(chest.id) || "Verrouillé",
        disabled: true,
      };
    }
  };

  const renderChest = (chest: Chest | undefined, index: number) => {
    if (!chest) {
      return (
        <div
          key={index}
          className="relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-xl rounded-xl p-1 border border-white/10 h-full flex flex-col"
        >
          <div className="text-center mt-auto">
            <div
              className={`w-full py-0.5 rounded-md font-bold ${isMobile ? "text-xs" : "text-sm mb-4"} text-white/30`}
            >
              Vide
            </div>
          </div>
        </div>
      );
    }

    const buttonConfig = getButtonConfig(chest);
    const hasTimeRemaining = getTimeRemaining(chest.id);
    const isUnlocked = chest.state === ChestState.UNLOCKED;

    return (
      <motion.div
        key={chest.id}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Timer Badge */}
        {hasTimeRemaining && (
          <div className="absolute -top-2 -right-2 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-xs px-1.5 py-0.5 rounded-full shadow-lg border border-white/20">
            <div className="flex items-center gap-1">
              <FontAwesomeIcon icon={faClock} size="sm" />
              {hasTimeRemaining}
            </div>
          </div>
        )}

        {/* Chest Container */}
        <div
          className={`relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-xl border transition-all duration-300 h-full flex flex-col ${
            isMobile ? "p-1" : "p-4"
          } ${
            isUnlocked && !hasTimeRemaining
              ? "border-yellow-400/50 shadow-lg shadow-yellow-400/20"
              : "border-white/20"
          }`}
        >
          {/* Chest Icon */}
          <div
            className={`flex justify-center flex-shrink-0 ${isMobile ? "mt-1" : "mt-3"}`}
          >
            <div className="relative">
              <Image
                src={`/images/icons/chests/chests_${chest.type}.png`}
                alt={chest.type}
                width={isMobile ? 50 : 75}
                height={isMobile ? 50 : 75}
                className="drop-shadow-lg"
              />
              {/* Glow effect for unlocked chests */}
              {isUnlocked && !hasTimeRemaining && (
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 to-orange-500/40 rounded-full blur-sm animate-pulse"></div>
              )}
            </div>
          </div>

          {/* Desktop Chest Info */}
          {!isMobile && (
            <div className="text-center mb-3">
              <div
                className={`text-white font-bold capitalize mb-1 ${isMobile ? "text-xs" : "text-lg"}`}
              >
                {getChestTypeName(chest.type)}
              </div>
              <div
                className={`text-white/70 ${isMobile ? "text-xs" : "text-sm"} mb-2`}
              >
                {getChestState(chest.id)
                  ? `Débloque dans ${getChestState(chest.id)}`
                  : "Prêt à ouvrir"}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="text-center mt-auto">
            <motion.button
              className={`w-full ${isMobile ? "py-0.5" : "py-2 px-3"} rounded-lg font-bold ${isMobile ? "text-xs" : "text-sm"} transition-all duration-300 ${buttonConfig.className}`}
              whileHover={!buttonConfig.disabled ? { scale: 1.02 } : {}}
              whileTap={!buttonConfig.disabled ? { scale: 0.98 } : {}}
              disabled={buttonConfig.disabled}
            >
              {buttonConfig.text}
            </motion.button>
          </div>
        </div>
      </motion.div>
    );
  };

  if (isMobile) {
    return (
      <div className={`${padding} mt-auto mb-2`}>
        <div className={`${maxWidth}`}>
          <div className="grid grid-cols-4 grid-rows-1 gap-2">
            {Array.from({ length: 4 }, (_, i) => renderChest(chests[i], i))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${padding}`}>
      <div className={`${maxWidth}`}>
        <div className="mb-4">
          <h3
            className={`text-white font-bold ${isMobile ? "text-sm" : "text-lg"} mb-2`}
          >
            Coffres de récompenses
          </h3>
          <p className={`text-white/70 ${isMobile ? "text-xs" : "text-sm"}`}>
            Ouvrez vos coffres pour obtenir des récompenses exclusives
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }, (_, i) => renderChest(chests[i], i))}
        </div>
      </div>
    </div>
  );
}
