import { useIsMobile } from "@/hooks/useIsMobile";
import ActionButton from "../utils/buttons/ActionButton";
import { ColorType } from "@/enums/themes/list/PurpleTheme";
import { useTranslation } from "@/hooks/useTranslation";

interface ProfileHeaderProps {
  handleBackToApp: () => void;
}

// Reusable components
const BackButton = ({
  onClick,
  isMobile,
}: {
  onClick: () => void;
  isMobile: boolean;
}) => (
  <ActionButton
    onClick={onClick}
    label={isMobile ? "←" : "← Retour"}
    color={{ color: ColorType.TRANSPARENT }}
  />
);

export default function ProfileHeader({ handleBackToApp }: ProfileHeaderProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div>
      {/* Header */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent"></div>

        {/* Top navigation */}
        {isMobile ? (
          /* Mobile: inline-flex layout */
          <div className="relative z-10 flex items-center justify-between p-4 pb-4">
            {/* Left side - Back button and Title */}
            <div className="flex items-center gap-3">
              <BackButton onClick={handleBackToApp} isMobile={isMobile} />
              <h1
                className={`${
                  isMobile ? "text-3xl" : "text-6xl mb-4"
                } font-bold text-white drop-shadow-2xl`}
              >
                {t("PROFIL")}
              </h1>
            </div>
          </div>
        ) : (
          /* Desktop: centered title layout */
          <div className="relative z-10 grid grid-cols-3 items-start p-4 pb-0">
            {/* Left side - Back button */}
            <div className="flex items-start gap-4">
              <BackButton onClick={handleBackToApp} isMobile={isMobile} />
            </div>

            {/* Center - Title */}
            <div className="text-center pb-4">
              <h1
                className={`${
                  isMobile ? "text-3xl" : "text-6xl mb-4"
                } font-bold text-white drop-shadow-2xl`}
              >
                {t("PROFIL")}
              </h1>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
