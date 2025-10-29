import Image from "next/image";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useAuth } from "@/contexts/AuthContext";
import { useCollection } from "@/contexts/CollectionContext";
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
  const { getCurrentTheme, getCurrentSkin } = useCollection();

  // Récupération du skin et du thème sélectionnés
  const cardSkin = getCurrentSkin();
  const theme = getCurrentTheme();

  return (
    <div className={`${padding} h-full`}>
      <div
        className={`flex ${maxWidth} gap-3 items-center bg-gradient-to-r ${GradientType.BACKGROUND_MAIN} rounded-xl p-3 border border-white/20 hover:border-white/40 transition-all duration-300 h-full`}
      >
        {/* Avatar du joueur */}
        <div className="relative">
          <Image
            src="/images/icons/avatar.png"
            alt="Profile"
            width={isMobile ? 45 : 80}
            height={isMobile ? 45 : 80}
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
        {!isMobile && (
          <>
            {/* Version Desktop - Skin de carte sélectionné */}
            <div className="flex items-center gap-2">
              <div className="relative group">
                <div className="absolute inset-0 bg-white/10 rounded-lg blur group-hover:bg-white/20 transition-all" />
                <div className="relative group-hover:scale-105 transition-transform duration-300">
                  <Card
                    cardState={CardState.CARD_BACK}
                    size="xsmall"
                    skinId={getCurrentSkin().id}
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
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${theme.getGradient(theme.GradientType.PRIMARY, "to-r")} border-2 border-white/30 shadow-lg group-hover:scale-105 transition-transform duration-300`}
                >
                  <div className="absolute inset-0 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all" />
                </div>
              </div>
              <div className="flex flex-col text-white/90">
                <span className="text-xs font-passionone text-white/60">
                  Thème
                </span>
                <span className="text-sm font-lucky">
                  {theme.getThemeType()}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
