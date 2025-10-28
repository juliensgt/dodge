import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import PlayButtonMobile from "./PlayButtonMobile";
import PlayButtonDesktop from "./PlayButtonDesktop";
import SecondaryButton from "./SecondaryButton";

interface PlayButtonsProps {
  maxWidth: string;
  onPlayClick?: () => void;
}

export default function PlayButtons({
  maxWidth,
  onPlayClick,
}: PlayButtonsProps) {
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleCreateGame = () => {
    router.push("/app/create-game");
  };

  const handleSearchGame = () => {
    router.push("/app/game-list");
  };

  const handlePlayGame = () => {
    if (onPlayClick) {
      onPlayClick();
    } else {
      router.push("/app/game");
    }
  };

  const handleModeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Ouvrir le menu de sélection du mode de jeu
  };

  return (
    <div className={`flex justify-center items-center w-full ${maxWidth}`}>
      {/* Version Mobile */}
      {isMobile && (
        <PlayButtonMobile
          onClick={handlePlayGame}
          onModeClick={handleModeClick}
        />
      )}

      {/* Version Desktop */}
      {!isMobile && (
        <div className="flex gap-6 items-center justify-center w-full">
          <PlayButtonDesktop
            onClick={handlePlayGame}
            onModeClick={handleModeClick}
          />

          {/* Boutons secondaires */}
          <div className="flex flex-col gap-4 flex-1">
            <SecondaryButton
              logo="/images/logos/search_game.png"
              logoAlt="Search"
              title="Rechercher"
              description="Trouver une partie"
              colorTheme="blue"
              onClick={handleSearchGame}
            />
            <SecondaryButton
              logo="/images/logos/create_game.png"
              logoAlt="Create"
              title="Créer"
              description="Nouvelle partie"
              colorTheme="emerald"
              onClick={handleCreateGame}
            />
          </div>
        </div>
      )}
    </div>
  );
}
