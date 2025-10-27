import Image from "next/image";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import Card, { CardState } from "@/components/game/cards/card/Card";
import { THEMES } from "@/enums/themes/ThemeManager";
import { GradientType } from "@/enums/themes/list/PurpleTheme";

interface PlayerProfileCardProps {
  padding: string;
  maxWidth: string;
}

export default function PlayerProfileCard({
  padding,
  maxWidth,
}: PlayerProfileCardProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { user } = useAuth();
  const { currentTheme, selectedSkinId, getCardSkin } = useTheme();

  // Récupération du skin et du thème sélectionnés
  const cardSkin = getCardSkin(selectedSkinId);
  const theme = THEMES[currentTheme];

  return (
    <div className={padding}>
      <div
        className={`flex ${maxWidth} gap-3 items-center bg-gradient-to-r ${GradientType.BACKGROUND_MAIN} rounded-xl p-3 border border-white/20 hover:border-white/40 transition-all duration-300`}
      >
        {/* Avatar du joueur */}
        <div className="relative">
          <Image
            src="/images/icons/avatar.png"
            alt="Profile"
            width={isMobile ? 60 : 80}
            height={isMobile ? 60 : 80}
            priority
            className="drop-shadow-lg cursor-pointer transition-all"
            onClick={() => router.push("/app")}
          />
        </div>

        {/* Informations du joueur */}
        <div className="flex flex-col text-white flex-1 min-w-0">
          <span
            className={`${isMobile ? "text-md" : "text-lg"} font-bold truncate font-['MT']`}
          >
            {user?.name || "Utilisateur"}
          </span>
          <span
            className={`${isMobile ? "text-sm" : "text-sm"} font-light text-white/80 font-passionone`}
          >
            Niveau {user?.level || 1}
          </span>
        </div>

        {/* Version Mobile - Skin et Thème compacts */}
        {isMobile ? (
          <div className="flex items-center gap-2">
            {/* Skin de carte miniature */}
            <Card
              cardState={CardState.CARD_BACK}
              size="xsmall"
              skinId={selectedSkinId}
            />
            <div className="flex flex-col text-white/90">
              <span className="text-sm font-passionone text-white/60">
                Deck
              </span>
              <span className="text-sm font-lucky">
                {cardSkin?.name || "Défaut"}
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* Version Desktop - Skin de carte sélectionné */}
            <div className="flex items-center gap-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-lg blur group-hover:bg-white/20 transition-all" />
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <Card
                    cardState={CardState.CARD_BACK}
                    size="xsmall"
                    skinId={selectedSkinId}
                  />
                </div>
              </div>
              <div className="flex flex-col text-white/90">
                <span className="text-xs font-passionone text-white/60">
                  Carte
                </span>
                <span className="text-sm font-lucky">
                  {cardSkin?.name || "Défaut"}
                </span>
              </div>
            </div>

            {/* Séparateur vertical */}
            <div className="h-12 w-px bg-white/20" />

            {/* Version Desktop - Thème sélectionné */}
            <div className="flex items-center gap-2">
              <div className="relative group">
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.preview} border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all" />
                </div>
              </div>
              <div className="flex flex-col text-white/90">
                <span className="text-xs font-passionone text-white/60">
                  Thème
                </span>
                <span className="text-sm font-lucky">{theme.name}</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
