import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faCog,
  faTrophy,
  faCheck,
  faRocket,
  faArrowRight,
  faArrowLeft as faPrev,
} from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "@/hooks/useTranslation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useGradient } from "@/hooks/useGradient";
import ActionButton from "@/components/utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { httpService } from "@/services/http/http.service";
import { GameOptionsBo } from "@/types/game/game.types";
import AppHeader from "@/components/layout/AppHeader";
import CreateGameStepNavigation from "./CreateGameStepNavigation";
import Step1GameMode from "./steps/Step1GameMode";
import Step2TournamentConfig from "./steps/Step2TournamentConfig";
import Step2GameConfig from "./steps/Step2GameConfig";
import Step3Summary from "./steps/Step3Summary";
import { FormData, GameMode } from "./types";
import { defaultFormData } from "./constants";

export default function CreateGame() {
  const { t } = useTranslation();
  const router = useRouter();
  const { getGradient, GradientType } = useGradient();
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [direction, setDirection] = useState(0);

  // Auto-advance when game mode is selected
  useEffect(() => {
    const handleGameModeSelected = () => {
      if (currentStep === 1) {
        setDirection(1);
        setCurrentStep(2);
      }
    };

    window.addEventListener("gameModeSelected", handleGameModeSelected);
    return () => {
      window.removeEventListener("gameModeSelected", handleGameModeSelected);
    };
  }, [currentStep]);

  // Step management
  const getTotalSteps = () => {
    return formData.gameMode === GameMode.TOURNAMENT ? 4 : 3;
  };

  const getSteps = () => {
    const baseSteps = [
      { id: "mode", title: "Mode de jeu", icon: faGamepad },
      { id: "config", title: "Configuration", icon: faCog },
      { id: "summary", title: "Résumé", icon: faCheck },
    ];

    if (formData.gameMode === GameMode.TOURNAMENT) {
      return [
        { id: "mode", title: "Mode de jeu", icon: faGamepad },
        { id: "tournament", title: "Tournoi", icon: faTrophy },
        { id: "config", title: "Configuration", icon: faCog },
        { id: "summary", title: "Résumé", icon: faCheck },
      ];
    }

    return baseSteps;
  };

  const nextStep = () => {
    if (currentStep < getTotalSteps()) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setDirection(step > currentStep ? 1 : -1);
    setCurrentStep(step);
  };

  const handleStepClick = (step: number) => {
    if (step <= currentStep + 1 && step >= 1) {
      setDirection(step > currentStep ? 1 : -1);
      setCurrentStep(step);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const gameOptions: GameOptionsBo = {
        maxPlayers: formData.maxPlayers,
        nbCardsPerPlayer: formData.nbCardsPerPlayer,
        nbSeeFirstCards: formData.nbSeeFirstCards,
        pointsForActionError: formData.pointsForActionError,
        limitPoints: formData.limitPoints,
        timeToPlay: formData.timeToPlay,
        timeToStartGame: formData.timeToStartGame,
        timeToSeeCards: formData.timeToSeeCards,
        modeDeJeu: formData.modeDeJeu,
      };

      await httpService
        .post("/games", {
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
          gameMode: formData.gameMode,
          privateGame: formData.privateGame,
          password: formData.password,
          // Tournament specific data
          //tournamentName: formData.tournamentName,
          //numberOfTables: formData.numberOfTables,
          //maxPlayersPerTable: formData.maxPlayersPerTable,
          //tournamentType: formData.tournamentType,
          //prizePool: formData.prizePool,
          //registrationDeadline: formData.registrationDeadline,
        })
        .then((game: unknown) => {
          console.log("game created", game);
          const gameData = game as { _id: string };
          if (gameData?._id) {
            router.push(`/app/game/${gameData?._id}`);
          } else {
            console.error("Game ID not found");
          }
        });
    } catch (error) {
      console.error("Error creating game:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1GameMode formData={formData} setFormData={setFormData} />;
      case 2:
        if (formData.gameMode === GameMode.TOURNAMENT) {
          return (
            <Step2TournamentConfig
              formData={formData}
              setFormData={setFormData}
            />
          );
        } else {
          return (
            <Step2GameConfig formData={formData} setFormData={setFormData} />
          );
        }
      case 3:
        if (formData.gameMode === GameMode.TOURNAMENT) {
          return (
            <Step2GameConfig formData={formData} setFormData={setFormData} />
          );
        } else {
          return <Step3Summary formData={formData} onEdit={handleEditStep} />;
        }
      case 4:
        return <Step3Summary formData={formData} onEdit={handleEditStep} />;
      default:
        return <Step1GameMode formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <div
      className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} font-['MT']`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-pink-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        {/* Navigation Header */}
        <AppHeader currentPage="play" />

        {/* Step Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <CreateGameStepNavigation
            currentStep={currentStep}
            totalSteps={getTotalSteps()}
            steps={getSteps()}
            onStepClick={handleStepClick}
          />
        </div>

        {/* Content */}
        <div
          className={`max-w-7xl mx-auto ${isMobile ? "px-4 pb-4" : "px-6 pb-8"}`}
        >
          <div className="overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentStep}
                custom={direction}
                initial={{
                  x: -300,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x: 300,
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  duration: 0.4,
                }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div
              className={`${isMobile ? "mt-6" : "mt-12"} flex justify-between items-center`}
            >
              <div>
                {currentStep > 1 && (
                  <ActionButton
                    onClick={prevStep}
                    label={t("Précédent")}
                    leftSection={<FontAwesomeIcon icon={faPrev} />}
                    color={{ color: ColorType.TRANSPARENT }}
                  />
                )}
              </div>

              <div className="flex gap-4">
                {currentStep < getTotalSteps() ? (
                  <ActionButton
                    onClick={nextStep}
                    label={t("Suivant")}
                    rightSection={<FontAwesomeIcon icon={faArrowRight} />}
                    gradient={{ gradientType: GradientType.PRIMARY }}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`group relative px-12 py-4 ${getGradient(GradientType.PRIMARY, "to-r")} text-white font-bold rounded-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform shadow-2xl overflow-hidden`}
                  >
                    <div className="relative flex items-center gap-3">
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          {t("Création...")}
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faRocket}
                            className="text-lg"
                          />
                          {t("Créer la partie")}
                        </>
                      )}
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
