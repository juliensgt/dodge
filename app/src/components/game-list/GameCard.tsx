import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { GameState, GameCardData } from "@/types/game/game.types";
import {
  faClock,
  faMedal,
  faUsers,
  faCog,
  faEye,
  faDice,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GameOptionsModal from "./options/GameOptionsModal";

interface GameCardProps {
  game: GameCardData;
  onJoinGame: (gameId: string) => void;
  onSpectateGame: (gameId: string) => void;
}

export default function GameCard({
  game,
  onJoinGame,
  onSpectateGame,
}: GameCardProps) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  const getStatusInfo = (state: GameState) => {
    switch (state) {
      case GameState.WAITING:
        return {
          label: t("En attente"),
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
        };
      case GameState.IN_GAME:
        return {
          label: t("En cours"),
          color: "text-green-400",
          bgColor: "bg-green-500/20",
        };
      case GameState.END_GAME:
        return {
          label: t("Terminé"),
          color: "text-gray-400",
          bgColor: "bg-gray-500/20",
        };
    }
  };

  const getAvailableActions = (state: GameState) => {
    switch (state) {
      case GameState.WAITING:
        return [
          {
            label: t("Rejoindre"),
            action: () => onJoinGame(game._id),
            color: { color: ColorType.PRIMARY },
          },
        ];
      case GameState.IN_GAME:
        return [
          {
            label: t("Observer"),
            action: () => onSpectateGame(game._id),
            color: { color: ColorType.SECONDARY },
          },
        ];
      case GameState.END_GAME:
        return [
          {
            label: t("Voir les résultats"),
            action: () => onSpectateGame(game._id),
            color: { color: ColorType.TRANSPARENT },
          },
        ];
      default:
        return [];
    }
  };

  const statusInfo = getStatusInfo(game.state);
  const actions = getAvailableActions(game.state);

  return (
    <div
      className={`group relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-6 transition-all duration-300 border border-white/20 
        hover:border-white/40 ${isHovered ? "scale-[1.02]" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec statut et bouton options */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-white mb-2 truncate">
            {t("Partie")} #{game._id.slice(0, 6)}
          </h3>
          <div className="flex items-center gap-3">
            <div
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 ${
                  game.state === GameState.WAITING
                    ? "bg-yellow-400 animate-pulse"
                    : game.state === GameState.IN_GAME
                      ? "bg-green-400 animate-pulse"
                      : "bg-gray-400"
                }`}
              ></div>
              {statusInfo.label}
            </div>
            <span className="text-white/60 text-sm">
              {t("Manche")} {game.round}
            </span>
          </div>
        </div>

        {/* Bouton options intégré */}
        {game.options && (
          <button
            onClick={() => setIsOptionsModalOpen(true)}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-200 group/btn"
            title={t("Voir les options")}
          >
            <FontAwesomeIcon
              icon={faCog}
              className="w-4 h-4 text-white/70 group-hover/btn:text-white group-hover/btn:rotate-90 transition-all duration-200"
            />
          </button>
        )}
      </div>

      {/* Informations principales */}
      <div className="mb-6 space-y-4">
        {/* Joueurs */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-white/10">
              <FontAwesomeIcon
                icon={faUsers}
                className="w-4 h-4 text-white/80"
              />
            </div>
            <span className="text-white/80 font-medium">{t("Joueurs")}</span>
          </div>
          <div className="text-right">
            <span className="text-lg font-bold text-white">
              {game.players?.length || 0}
            </span>
            {game.options?.maxPlayers && (
              <span className="text-white/50 text-lg ml-1">
                /{game.options.maxPlayers}
              </span>
            )}
          </div>
        </div>

        {/* Options de jeu - design amélioré */}
        {game.options && (
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-yellow-500/20">
                  <FontAwesomeIcon
                    icon={faMedal}
                    className="w-3 h-3 text-yellow-400"
                  />
                </div>
                <div>
                  <div className="text-white/60 text-xs">
                    {t("Points limite")}
                  </div>
                  <div className="text-white font-semibold">
                    {game.options.limitPoints}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-blue-500/20">
                  <FontAwesomeIcon
                    icon={faClock}
                    className="w-3 h-3 text-blue-400"
                  />
                </div>
                <div>
                  <div className="text-white/60 text-xs">
                    {t("Temps par tour")}
                  </div>
                  <div className="text-white font-semibold">
                    {game.options.timeToPlay}s
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-purple-500/20">
                  <FontAwesomeIcon
                    icon={faDice}
                    className="w-3 h-3 text-purple-400"
                  />
                </div>
                <div>
                  <div className="text-white/60 text-xs">{t("Cartes")}</div>
                  <div className="text-white font-semibold">
                    {game.options.nbCards}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-1.5 rounded-lg bg-green-500/20">
                  <FontAwesomeIcon
                    icon={faEye}
                    className="w-3 h-3 text-green-400"
                  />
                </div>
                <div>
                  <div className="text-white/60 text-xs">{t("Visibles")}</div>
                  <div className="text-white font-semibold">
                    {game.options.nbSeeFirstCards}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-3 justify-end">
        {actions.map((action, index) => (
          <div key={index} className="w-full">
            <ActionButton
              onClick={action.action}
              label={action.label}
              color={action.color}
            />
          </div>
        ))}
      </div>

      {/* Game Options Modal */}
      {game.options && (
        <GameOptionsModal
          isOpen={isOptionsModalOpen}
          onClose={() => setIsOptionsModalOpen(false)}
          options={game.options}
        />
      )}
    </div>
  );
}
