import { useTranslation } from "@/hooks/useTranslation";
import Modal from "@/components/utils/modals/Modal";
import { GameOptionsBo } from "@/types/game/game.types";
import {
  faClock,
  faCreditCard,
  faMedal,
  faUsers,
  faEye,
  faExclamationTriangle,
  faCoins,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { GameOptionsSection } from "./GameOptionsSection";

interface GameOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  options: GameOptionsBo;
}

export default function GameOptionsModal({
  isOpen,
  onClose,
  options,
}: GameOptionsModalProps) {
  const { t } = useTranslation();

  // Organiser les données par sections logiques
  const gameSettings = [
    {
      icon: faUsers,
      label: t("Joueurs maximum"),
      value: options.maxPlayers?.toString() ?? "???",
      description: t("Nombre maximum de joueurs autorisés"),
      category: "players",
    },
  ];

  const pointsSettings = [
    {
      icon: faMedal,
      label: t("Points limite"),
      value: options.limitPoints?.toString() ?? "???",
      description: t("Points maximum avant élimination"),
      category: "points",
    },
    {
      icon: faExclamationTriangle,
      label: t("Points d'erreur"),
      value: options.pointsForActionError?.toString() ?? "???",
      description: t("Points perdus pour une action incorrecte"),
      category: "points",
    },
  ];

  const cardSettings = [
    {
      icon: faCreditCard,
      label: t("Nombre de cartes"),
      value: options.nbCardsPerPlayer?.toString() ?? "???",
      description: t("Nombre de cartes par joueur"),
      category: "cards",
    },
    {
      icon: faEye,
      label: t("Cartes visibles"),
      value: options.nbSeeFirstCards?.toString() ?? "???",
      description: t("Nombre de cartes visibles au début"),
      category: "cards",
    },
  ];

  const timeSettings = [
    {
      icon: faClock,
      label: t("Temps par tour"),
      value: `${options.timeToPlay?.toString() ?? "???"}s`,
      description: t("Temps alloué par joueur pour jouer"),
      category: "time",
    },
    {
      icon: faEye,
      label: t("Temps de visualisation"),
      value: `${options.timeToSeeCards?.toString() ?? "???"}s`,
      description: t("Temps pour voir les cartes au début"),
      category: "time",
    },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-8">
        {/* Section Configuration du Jeu */}
        <GameOptionsSection
          title={t("Configuration du jeu")}
          icon={faGear}
          iconColor="text-blue-400"
          bgColor="bg-blue-500/30"
          borderColor="border-blue-500/50"
          items={gameSettings}
        />

        {/* Section Configuration des Points */}
        <GameOptionsSection
          title={t("Configuration des points")}
          icon={faCoins}
          iconColor="text-orange-400"
          bgColor="bg-orange-500/30"
          borderColor="border-orange-500/50"
          items={pointsSettings}
        />

        {/* Section Configuration des Cartes */}
        <GameOptionsSection
          title={t("Configuration des cartes")}
          icon={faCreditCard}
          iconColor="text-purple-400"
          bgColor="bg-purple-500/30"
          borderColor="border-purple-500/50"
          items={cardSettings}
        />

        {/* Section Configuration du Temps */}
        <GameOptionsSection
          title={t("Configuration du temps")}
          icon={faClock}
          iconColor="text-emerald-400"
          bgColor="bg-emerald-500/30"
          borderColor="border-emerald-500/50"
          items={timeSettings}
        />
      </div>
    </Modal>
  );
}
