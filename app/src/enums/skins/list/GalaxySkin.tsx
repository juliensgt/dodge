import { Size } from "@/scripts/references/playerLayouts";
import {
  isSmallCard,
  getCardTextSizeClass,
  CARD_TEXT,
} from "@/enums/skins/SkinManager";

interface GalaxySkinProps {
  size?: Size;
}

export default function GalaxySkin({ size = "small" }: GalaxySkinProps) {
  const isSmall = isSmallCard(size);
  const textSizeClass = getCardTextSizeClass(isSmall);

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "radial-gradient(ellipse at 20% 30%, #a18fff 0%, transparent 60%), radial-gradient(ellipse at 80% 70%, #4e54c8 0%, transparent 60%), linear-gradient(135deg, #1a237e 0%, #0d133d 100%)",
      }}
    >
      {/* Étoiles scintillantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-80 animate-pulse"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Lettre D galaxie */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Glow externe */}
          <div
            className={`absolute ${textSizeClass} font-black text-indigo-300 opacity-60`}
            style={{
              textShadow:
                "0 0 16px #a18fff, 0 0 32px #4e54c8, 0 0 48px #fff, 0 0 64px #a18fff",
              transform: "translate(3px, 3px)",
            }}
          >
            {CARD_TEXT}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${textSizeClass} font-black text-white`}
            style={{
              textShadow: "0 0 8px #a18fff, 0 0 16px #fff, 0 0 32px #4e54c8",
            }}
          >
            {CARD_TEXT}
          </div>
        </div>
      </div>

      {/* Bordures galaxie */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-indigo-300 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-indigo-300 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-indigo-300 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-indigo-300 rounded-br-lg"></div>

      {/* Effet de nébuleuse */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, #fff 0%, transparent 70%), radial-gradient(circle at 30% 80%, #a18fff 0%, transparent 80%)",
        }}
      ></div>
    </div>
  );
}
