import React from "react";
import Toast, { ToastProps } from "./Toast";
import { useToast } from "@/contexts/ToastContext";

const ToastContainer: React.FC = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast: ToastProps) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
