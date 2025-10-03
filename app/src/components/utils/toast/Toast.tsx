import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/contexts/ToastContext";

export interface ToastProps {
  id: string;
  type: "success" | "error" | "warning" | "info";
  title: string;
  message?: string;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
}) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, removeToast]);

  const getIcon = () => {
    switch (type) {
      case "success":
        return (
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
        );
      case "error":
        return (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-red-500"
          />
        );
      case "warning":
        return (
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            className="text-yellow-500"
          />
        );
      case "info":
        return (
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
        );
      default:
        return (
          <FontAwesomeIcon icon={faInfoCircle} className="text-blue-500" />
        );
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200";
      case "error":
        return "bg-red-50 border-red-200";
      case "warning":
        return "bg-yellow-50 border-yellow-200";
      case "info":
        return "bg-blue-50 border-blue-200";
      default:
        return "bg-blue-50 border-blue-200";
    }
  };

  return (
    <div
      className={`
        ${getBackgroundColor()}
        border rounded-lg shadow-lg p-4 mb-3 max-w-sm w-full
        transform transition-all duration-300 ease-in-out
        animate-in slide-in-from-right-full
      `}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-3">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
          {message && <p className="text-sm text-gray-600">{message}</p>}
        </div>
        <div className="flex-shrink-0 ml-3">
          <button
            onClick={() => removeToast(id)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
