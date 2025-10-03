import { useEffect } from "react";
import { useToast } from "@/contexts/ToastContext";
import { errorService } from "@/services/error/error.service";

export const useErrorHandler = () => {
  const toastContext = useToast();

  useEffect(() => {
    // Initialiser le service d'erreur avec le contexte toast
    errorService.setToastContext(toastContext);
  }, [toastContext]);

  return {
    handleApiError: errorService.handleApiError.bind(errorService),
    handleWebSocketError: errorService.handleWebSocketError.bind(errorService),
    showSuccess: errorService.showSuccess.bind(errorService),
    showWarning: errorService.showWarning.bind(errorService),
    showInfo: errorService.showInfo.bind(errorService),
    showError: errorService.showError.bind(errorService),
  };
};
