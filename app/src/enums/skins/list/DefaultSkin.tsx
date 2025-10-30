import { GradientType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";
import { Size } from "@/scripts/references/playerLayouts";
import {
  isSmallCard,
  getCardTextSizeClass,
  CARD_TEXT,
} from "@/enums/skins/SkinManager";

interface DefaultSkinProps {
  size?: Size;
}

export default function DefaultSkin({ size = "small" }: DefaultSkinProps) {
  const isSmall = isSmallCard(size);
  const textSizeClass = getCardTextSizeClass(isSmall);

  return (
    <div
      className={`card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg ${useGradient().getGradient(GradientType.PRIMARY, "to-r")}`}
    >
      {/* Lettre D principale */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${textSizeClass} font-black text-white opacity-30`}
            style={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
              transform: "translate(2px, 2px)",
            }}
          >
            {CARD_TEXT}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${textSizeClass} font-black text-white`}
            style={{
              textShadow:
                "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)",
              filter: "drop-shadow(0 0 10px rgba(255,255,255,0.8))",
            }}
          >
            {CARD_TEXT}
          </div>
        </div>
      </div>

      {/* Motif de coins */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/25 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/25 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/25 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/25 rounded-br-lg"></div>

      {/* Effet de brillance */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          background:
            "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)",
          transform: "translateX(-100%)",
          animation: "shine 3s infinite",
        }}
      ></div>

      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
