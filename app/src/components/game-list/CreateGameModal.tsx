import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import Modal from "@/components/utils/modals/Modal";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";
import { GameOptionsBo } from "@/types/game/game.types";
import { httpService } from "@/services/http/http.service";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faCreditCard,
  faClock,
  faCoins,
  faExclamationTriangle,
  faEye,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

interface CreateGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  maxPlayers: number;
  nbCards: number;
  nbSeeFirstCards: number;
  pointsForActionError: number;
  limitPoints: number;
  timeToPlay: number;
  timeToStartGame: number;
  timeToSeeCards: number;
}

const defaultFormData: FormData = {
  maxPlayers: 6,
  nbCards: 52,
  nbSeeFirstCards: 2,
  pointsForActionError: 5,
  limitPoints: 150,
  timeToPlay: 30,
  timeToStartGame: 10,
  timeToSeeCards: 10,
};

export default function CreateGameModal({
  isOpen,
  onClose,
}: CreateGameModalProps) {
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (formData.maxPlayers < 2 || formData.maxPlayers > 8) {
      newErrors.maxPlayers = 1; // Use number for error tracking
    }

    if (formData.nbCards < 20 || formData.nbCards > 104) {
      newErrors.nbCards = 1;
    }

    if (formData.nbSeeFirstCards < 1 || formData.nbSeeFirstCards > 5) {
      newErrors.nbSeeFirstCards = 1;
    }

    if (
      formData.pointsForActionError < 1 ||
      formData.pointsForActionError > 20
    ) {
      newErrors.pointsForActionError = 1;
    }

    if (formData.limitPoints < 50 || formData.limitPoints > 500) {
      newErrors.limitPoints = 1;
    }

    if (formData.timeToPlay < 10 || formData.timeToPlay > 120) {
      newErrors.timeToPlay = 1;
    }

    if (formData.timeToStartGame < 5 || formData.timeToStartGame > 60) {
      newErrors.timeToStartGame = 1;
    }

    if (formData.timeToSeeCards < 5 || formData.timeToSeeCards > 30) {
      newErrors.timeToSeeCards = 1;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const gameOptions: GameOptionsBo = {
        maxPlayers: formData.maxPlayers,
        nbCards: formData.nbCards,
        nbSeeFirstCards: formData.nbSeeFirstCards,
        pointsForActionError: formData.pointsForActionError,
        limitPoints: formData.limitPoints,
        timeToPlay: formData.timeToPlay,
        timeToStartGame: formData.timeToStartGame,
        timeToSeeCards: formData.timeToSeeCards,
      };

      const game = (await httpService.post("/games", {
        options: gameOptions,
        gameState: "WAITING",
        players: [],
        deck: [],
        defausse: [],
        round: 0,
        tour: 0,
        indexLastPlayerWhoPlay: 0,
        indexPlayerWhoPlays: 0,
        playerDodge: "",
      })) as { id: string };

      // Redirect to the created game
      router.push(`/app/game/${game.id}`);
      onClose();
    } catch (error) {
      console.error("Error creating game:", error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData(defaultFormData);
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const inputClasses =
    "w-full px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200";
  const errorClasses = "text-red-400 text-sm mt-1";
  const labelClasses = "block text-sm font-medium text-white/90 mb-2";

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={t("Créer une partie")}>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Configuration du Jeu */}
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-xl p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faGear} className="text-blue-400" />
            <h3 className="text-lg font-semibold text-white">
              {t("Configuration du jeu")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                <FontAwesomeIcon icon={faUsers} className="mr-2" />
                {t("Nombre de joueurs")}
              </label>
              <input
                type="number"
                min="2"
                max="8"
                value={formData.maxPlayers}
                onChange={(e) =>
                  handleInputChange("maxPlayers", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="6"
              />
              {errors.maxPlayers && (
                <p className={errorClasses}>
                  {t("Le nombre de joueurs doit être entre 2 et 8")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClasses}>
                <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                {t("Nombre de cartes")}
              </label>
              <input
                type="number"
                min="20"
                max="104"
                value={formData.nbCards}
                onChange={(e) =>
                  handleInputChange("nbCards", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="52"
              />
              {errors.nbCards && (
                <p className={errorClasses}>
                  {t("Le nombre de cartes doit être entre 20 et 104")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClasses}>
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                {t("Cartes à voir")}
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={formData.nbSeeFirstCards}
                onChange={(e) =>
                  handleInputChange("nbSeeFirstCards", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="2"
              />
              {errors.nbSeeFirstCards && (
                <p className={errorClasses}>
                  {t("Le nombre de cartes à voir doit être entre 1 et 5")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Configuration des Points */}
        <div className="bg-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faCoins} className="text-orange-400" />
            <h3 className="text-lg font-semibold text-white">
              {t("Configuration des points")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>
                <FontAwesomeIcon
                  icon={faExclamationTriangle}
                  className="mr-2"
                />
                {t("Points d'erreur")}
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={formData.pointsForActionError}
                onChange={(e) =>
                  handleInputChange(
                    "pointsForActionError",
                    parseInt(e.target.value)
                  )
                }
                className={inputClasses}
                placeholder="5"
              />
              {errors.pointsForActionError && (
                <p className={errorClasses}>
                  {t("Les points d'erreur doivent être entre 1 et 20")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClasses}>
                <FontAwesomeIcon icon={faCoins} className="mr-2" />
                {t("Limite de points")}
              </label>
              <input
                type="number"
                min="50"
                max="500"
                value={formData.limitPoints}
                onChange={(e) =>
                  handleInputChange("limitPoints", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="150"
              />
              {errors.limitPoints && (
                <p className={errorClasses}>
                  {t("La limite de points doit être entre 50 et 500")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Configuration du Temps */}
        <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-4 border border-emerald-500/30">
          <div className="flex items-center gap-2 mb-4">
            <FontAwesomeIcon icon={faClock} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">
              {t("Configuration du temps")}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>{t("Temps de jeu (s)")}</label>
              <input
                type="number"
                min="10"
                max="120"
                value={formData.timeToPlay}
                onChange={(e) =>
                  handleInputChange("timeToPlay", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="30"
              />
              {errors.timeToPlay && (
                <p className={errorClasses}>
                  {t("Le temps de jeu doit être entre 10 et 120 secondes")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClasses}>
                {t("Temps de démarrage (s)")}
              </label>
              <input
                type="number"
                min="5"
                max="60"
                value={formData.timeToStartGame}
                onChange={(e) =>
                  handleInputChange("timeToStartGame", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="10"
              />
              {errors.timeToStartGame && (
                <p className={errorClasses}>
                  {t("Le temps de démarrage doit être entre 5 et 60 secondes")}
                </p>
              )}
            </div>

            <div>
              <label className={labelClasses}>
                {t("Temps de visualisation (s)")}
              </label>
              <input
                type="number"
                min="5"
                max="30"
                value={formData.timeToSeeCards}
                onChange={(e) =>
                  handleInputChange("timeToSeeCards", parseInt(e.target.value))
                }
                className={inputClasses}
                placeholder="10"
              />
              {errors.timeToSeeCards && (
                <p className={errorClasses}>
                  {t(
                    "Le temps de visualisation des cartes doit être entre 5 et 30 secondes"
                  )}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4">
          <ActionButton
            onClick={handleClose}
            label={t("Annuler")}
            color={{ color: ColorType.TRANSPARENT }}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            {isLoading ? t("Création...") : t("Créer la partie")}
          </button>
        </div>
      </form>
    </Modal>
  );
}
