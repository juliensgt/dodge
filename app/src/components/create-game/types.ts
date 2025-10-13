import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { GameOptionsBo } from "@/types/game/game.types";

// Game Mode Types
export enum GameMode {
  QUICK = "quick",
  CLASSIC = "classic",
  TOURNAMENT = "tournament",
  CUSTOM = "custom",
}

// Deck Types
export enum DeckType {
  STANDARD = "standard",
  ADVANCED = "advanced",
  ULTIMATE = "ultimate",
  CUSTOM = "custom",
}

// Deck Presets
export interface DeckPreset {
  id: DeckType;
  name: string;
  description: string;
  cardCount: number;
  color: string;
  icon: string;
  disabled?: boolean;
}

export interface GameModePreset {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  color: string;
  options: Partial<GameOptionsBo>;
  hasSpecificSteps?: boolean;
  disabled?: boolean;
}

export interface FormData extends GameOptionsBo {
  gameMode: GameMode;
  privateGame: boolean;
  password?: string;
  nbCardsPerPlayer: number;
  // Tournament specific fields
  tournamentName?: string;
  numberOfTables?: number;
  maxPlayersPerTable?: number;
  tournamentType?: "single" | "double" | "round_robin";
  prizePool?: number;
  registrationDeadline?: string;
  // Game specific fields
  gameDescription?: string;
  tags?: string[];
}

export interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ id: string; title: string; icon: IconDefinition }>;
  onStepClick?: (step: number) => void;
}

export interface CreateGameHeaderProps {
  handleBack: () => void;
}

export interface StepProps {
  formData: FormData;
  setFormData: (data: FormData | ((prev: FormData) => FormData)) => void;
}

export interface SummaryStepProps {
  formData: FormData;
  onEdit: (step: number) => void;
}

export interface CreateGameProps {
  // Add any props needed for the main component
  [key: string]: unknown;
}
