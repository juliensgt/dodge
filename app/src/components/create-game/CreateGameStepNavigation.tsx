import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "@/hooks/useTranslation";
import { useGradient } from "@/hooks/useGradient";
import { useIsMobile } from "@/hooks/useIsMobile";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { StepNavigationProps } from "./types";

export default function CreateGameStepNavigation({
  currentStep,
  totalSteps,
  steps,
  onStepClick,
}: StepNavigationProps) {
  const { t } = useTranslation();
  const { getGradient, GradientType } = useGradient();
  const isMobile = useIsMobile();

  return (
    <div
      className={`${isMobile ? "max-w-full px-3" : "max-w-6xl"} mx-auto ${isMobile ? "mb-4" : "mb-8"}`}
    >
      <div
        className={`bg-white/10 backdrop-blur-lg rounded-2xl ${isMobile ? "p-3" : "p-4"}`}
      >
        {/* Progress Bar */}
        <div
          className={`flex items-center justify-between ${isMobile ? "mb-3" : "mb-4"}`}
        >
          <div
            className={`flex-1 bg-white/20 rounded-full h-3 ${isMobile ? "mr-2" : "mr-4"}`}
          >
            <div
              className={`${getGradient(GradientType.PRIMARY, "to-r")} h-3 rounded-full transition-all duration-500`}
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div
            className={`text-white font-semibold ${isMobile ? "text-sm" : ""}`}
          >
            {t("Étape")} {currentStep} / {totalSteps}
          </div>
        </div>

        {/* Step Indicators */}
        <div className={`flex justify-center ${isMobile ? "gap-2" : "gap-4"}`}>
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepClick && onStepClick(index + 1)}
              disabled={index + 1 > currentStep + 1}
              className={`flex items-center gap-2 ${isMobile ? "px-2 py-1" : "px-3 py-2"} rounded-xl transition-all duration-300 ${
                index + 1 <= currentStep + 1
                  ? "bg-white/20 text-white shadow-lg hover:bg-white/30 cursor-pointer"
                  : "text-white/50 cursor-not-allowed"
              }`}
            >
              <div
                className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} rounded-full flex items-center justify-center ${isMobile ? "text-xs" : "text-sm"} font-bold ${
                  index + 1 < currentStep
                    ? "bg-green-500 text-white"
                    : index + 1 === currentStep
                      ? "bg-blue-500 text-white"
                      : "bg-white/20 text-white/50"
                }`}
              >
                {index + 1 < currentStep ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={isMobile ? "text-xs" : "text-sm"}
                  />
                ) : (
                  index + 1
                )}
              </div>
              {!isMobile && (
                <span className="text-sm font-medium">{t(step.title)}</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
