import { useStatusBar } from "@/hooks/useStatusBar";

/**
 * Composant qui gère la mise à jour de la barre de statut selon le thème
 * Doit être utilisé à l'intérieur d'un CollectionProvider
 */
export function StatusBarComponent() {
  useStatusBar();
  return null; // Ce composant ne rend rien visuellement
}
