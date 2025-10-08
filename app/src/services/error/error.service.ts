import { ToastProps } from "@/components/utils/toast/Toast";

interface ApiError {
  message: string;
  error?: string;
  statusCode?: number;
  code?: string;
}

interface WebSocketError {
  error?: string;
  message: string;
  timestamp?: string;
  event?: string;
  gameId?: string;
  playerId?: string;
}

interface ToastContextType {
  addToast: (toast: Omit<ToastProps, "id">) => void;
}

class ErrorService {
  private static instance: ErrorService;
  private toastContext: ToastContextType | null = null;

  private constructor() {}

  static getInstance() {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  // Cette méthode doit être appelée depuis un composant React pour avoir accès au contexte
  setToastContext(toastContext: ToastContextType) {
    this.toastContext = toastContext;
  }

  // Méthode pour initialiser le service avec le contexte toast
  initializeWithToastContext() {
    // Cette méthode sera appelée depuis le ToastProvider
    return {
      setToastContext: this.setToastContext.bind(this),
    };
  }

  private showErrorToast(title: string, message: string) {
    if (this.toastContext) {
      this.toastContext.addToast({
        type: "error",
        title,
        message,
        duration: 6000,
      });
    } else {
      // Fallback: show browser alert if toast context not available
      console.error("Toast context not available:", title, message);
      alert(`${title}: ${message}`);
    }
  }

  private showSuccessToast(title: string, message?: string) {
    if (this.toastContext) {
      this.toastContext.addToast({
        type: "success",
        title,
        message,
        duration: 4000,
      });
    }
  }

  private showWarningToast(title: string, message?: string) {
    if (this.toastContext) {
      this.toastContext.addToast({
        type: "warning",
        title,
        message,
        duration: 5000,
      });
    }
  }

  private showInfoToast(title: string, message?: string) {
    if (this.toastContext) {
      this.toastContext.addToast({
        type: "info",
        title,
        message,
        duration: 4000,
      });
    }
  }

  // Méthode principale pour gérer les erreurs de l'API
  handleApiError(error: unknown) {
    console.error("API Error:", error);

    // Vérifier si c'est une erreur HTTP avec response
    const httpError = error as {
      response?: { status: number; data: ApiError };
    };

    if (!httpError.response) {
      // Si ce n'est pas une erreur HTTP, traiter comme une erreur WebSocket
      this.handleWebSocketError(error as WebSocketError);
      return;
    }

    const { status, data } = httpError.response;
    const apiError: ApiError = data;

    // Gestion des erreurs par code de statut
    switch (status) {
      case 400:
        this.showErrorToast(
          "Requête invalide",
          apiError.message || "Les données envoyées sont incorrectes."
        );
        break;
      case 401:
        this.showErrorToast(
          "Non autorisé",
          "Votre session a expiré. Veuillez vous reconnecter."
        );
        break;
      case 403:
        this.showErrorToast(
          "Accès refusé",
          "Vous n'avez pas les permissions nécessaires pour cette action."
        );
        break;
      case 404:
        this.showErrorToast(
          "Ressource introuvable",
          apiError.message || "La ressource demandée n'existe pas."
        );
        break;
      case 409:
        this.showErrorToast(
          "Conflit",
          apiError.message ||
            "Cette action entre en conflit avec l'état actuel."
        );
        break;
      case 422:
        this.showErrorToast(
          "Données invalides",
          apiError.message || "Les données fournies ne sont pas valides."
        );
        break;
      case 429:
        this.showErrorToast(
          "Trop de requêtes",
          "Vous avez effectué trop de requêtes. Veuillez patienter."
        );
        break;
      case 500:
        this.showErrorToast(
          "Erreur serveur",
          "Une erreur interne s'est produite. Veuillez réessayer plus tard."
        );
        break;
      default:
        this.showErrorToast(
          "Erreur inconnue",
          apiError.message || `Une erreur s'est produite (${status}).`
        );
    }
  }

  // Méthode pour gérer les erreurs WebSocket
  handleWebSocketError(error: WebSocketError | unknown) {
    console.error("WebSocket Error:", error);

    // Vérifier si c'est une erreur structurée du serveur
    if (error && typeof error === "object" && "message" in error) {
      const wsError = error as WebSocketError;
      const title = wsError.error || "Erreur WebSocket";
      const message = wsError.message || "Une erreur s'est produite";

      this.showErrorToast(title, message);
    } else {
      // Erreur inconnue
      this.showErrorToast(
        "Erreur WebSocket",
        "Une erreur inattendue s'est produite"
      );
    }
  }

  // Méthodes utilitaires pour afficher différents types de toasts
  showSuccess(title: string, message?: string) {
    this.showSuccessToast(title, message);
  }

  showWarning(title: string, message?: string) {
    this.showWarningToast(title, message);
  }

  showInfo(title: string, message?: string) {
    this.showInfoToast(title, message);
  }

  showError(title: string, message?: string) {
    this.showErrorToast(title, message || "");
  }
}

export const errorService = ErrorService.getInstance();
