import { useState, useEffect } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768); // Breakpoint md de Tailwind
    };

    // Vérifier au montage
    checkIsMobile();

    // Écouter les changements de taille
    window.addEventListener("resize", checkIsMobile);

    // Nettoyer l'event listener
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return isMobile;
}
