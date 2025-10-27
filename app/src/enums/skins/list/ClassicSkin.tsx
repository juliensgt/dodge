import { Size } from "@/scripts/references/playerLayouts";

interface ClassicSkinProps {
  size?: Size;
}

export default function ClassicSkin({ size = "small" }: ClassicSkinProps) {
  const isSmall = size === "small" || size === "xsmall" || size === "xxsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #CD853F 100%)",
      }}
    >
      {/* Motif de fond classique */}
      <div className="absolute inset-0 opacity-20">
        {/* Motif de diamants */}
        <div className="absolute top-4 left-4 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white"></div>
        <div className="absolute top-4 right-4 w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
        <div className="absolute bottom-4 left-4 w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-white"></div>
        <div className="absolute bottom-4 right-4 w-0 h-0 border-l-4 border-r-4 border-b-6 border-l-transparent border-r-transparent border-b-white"></div>

        {/* Lignes décoratives */}
        <div className="absolute top-1/2 left-2 right-2 h-px bg-white/30"></div>
        <div className="absolute left-1/2 top-2 bottom-2 w-px bg-white/30"></div>
      </div>

      {/* Lettre D classique */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-200 opacity-40`}
            style={{
              textShadow: "3px 3px 6px rgba(0,0,0,0.5)",
              transform: "translate(3px, 3px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-100`}
            style={{
              textShadow:
                "1px 1px 2px rgba(0,0,0,0.8), 0 0 10px rgba(255,215,0,0.3)",
              filter: "drop-shadow(0 0 5px rgba(255,215,0,0.5))",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures dorées */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-400 rounded-br-lg"></div>

      {/* Effet de texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background:
            "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
        }}
      ></div>
    </div>
  );
}
