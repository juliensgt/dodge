import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { gameService } from "@/services/game/game.service";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";
import { GameCardData, GameState } from "@/types/game/game.types";
import GameCard from "./GameCard";

interface GameListProps {
  onJoinGame: (gameId: string) => void;
  onSpectateGame: (gameId: string) => void;
  onCreateGame: () => void;
}

type FilterOption = "all" | GameState;

export default function GameList({
  onJoinGame,
  onSpectateGame,
  onCreateGame,
}: GameListProps) {
  const { t } = useTranslation();
  const { GradientType } = useGradient();
  const [games, setGames] = useState<GameCardData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      setGames(await gameService.getGames());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  const handleRefresh = () => {
    fetchGames();
  };

  const filteredAndSortedGames = useMemo(() => {
    let filtered = games;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (game) =>
          game._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          game.players?.some((player) =>
            player.name?.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Filter by status
    if (filterBy !== "all") {
      filtered = filtered.filter((game) => game.state === filterBy);
    }

    return filtered;
  }, [games, searchQuery, filterBy]);

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {t("Liste des parties")}
          </h2>
          <p className="text-white/70">
            {filteredAndSortedGames.length}{" "}
            {filteredAndSortedGames.length === 1
              ? t("partie trouvée")
              : t("parties trouvées")}
            {searchQuery || filterBy !== "all" ? (
              <span className="text-white/50">
                {" "}
                ({t("sur")} {games.length})
              </span>
            ) : null}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ActionButton
            onClick={onCreateGame}
            label={t("Créer une partie")}
            gradient={{ gradientType: GradientType.PRIMARY }}
          />
          <ActionButton
            onClick={handleRefresh}
            label={t("Actualiser")}
            color={{ color: ColorType.TRANSPARENT }}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Search and Filters */}

      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t("Rechercher")}
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("ID de partie ou nom de joueur...")}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            />
          </div>

          {/* Filter by Status */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              {t("Statut")}
            </label>
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
            >
              <option value="all">{t("Tous")}</option>
              <option value={GameState.WAITING}>{t("En attente")}</option>
              <option value={GameState.IN_GAME}>{t("En cours")}</option>
              <option value={GameState.END_GAME}>{t("Terminé")}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      {isLoading ? (
        <div className="text-center py-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {t("Chargement des parties...")}
            </h3>
            <p className="text-white/70">{t("Veuillez patienter")}</p>
          </div>
        </div>
      ) : filteredAndSortedGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md mx-auto">
            {searchQuery || filterBy !== "all" ? (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t("Aucune partie trouvée")}
                </h3>
                <p className="text-white/70 mb-6">
                  {t("Essayez de modifier vos critères de recherche")}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <ActionButton
                    onClick={() => {
                      setSearchQuery("");
                      setFilterBy("all");
                    }}
                    label={t("Effacer les filtres")}
                    color={{ color: ColorType.TRANSPARENT }}
                  />
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {t("Aucune partie disponible")}
                </h3>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedGames.map((game) => (
            <GameCard
              key={game._id}
              game={game}
              onJoinGame={onJoinGame}
              onSpectateGame={onSpectateGame}
            />
          ))}
        </div>
      )}
    </div>
  );
}
