import { Size } from "@/scripts/references/playerLayouts";

interface PixelArtSkinProps {
  size?: Size;
}

export default function PixelArtSkin({ size = "small" }: PixelArtSkinProps) {
  const isSmall = size === "small" || size === "xsmall" || size === "xxsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg bg-yellow-100 border-4 border-yellow-400"
      style={{
        imageRendering: "pixelated",
        background:
          "repeating-linear-gradient(45deg, #e0c97f 0 10px, #f7e9b0 10px 20px)",
      }}
    >
      {/* Motif damier pixel art */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage:
              "linear-gradient(90deg, #bfae6a 1px, transparent 1px), linear-gradient(#bfae6a 1px, transparent 1px)",
            backgroundSize: "8px 8px",
          }}
        ></div>
      </div>

      {/* Lettre D pixel art */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-700 opacity-40`}
            style={{
              textShadow: "2px 2px 0 #bfae6a, 4px 4px 0 #fffbe6",
              fontFamily: "'Press Start 2P', monospace",
              transform: "translate(2px, 2px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-900`}
            style={{
              textShadow: "1px 1px 0 #fffbe6, 2px 2px 0 #bfae6a",
              fontFamily: "'Press Start 2P', monospace",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures pixel art */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-yellow-700 rounded-none"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-yellow-700 rounded-none"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-yellow-700 rounded-none"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-yellow-700 rounded-none"></div>

      {/* Effet pixel art supplémentaire */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(135deg, #fffbe6 0 2px, transparent 2px 4px)",
        }}
      ></div>
      {/* Police pixel art */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap");
      `}</style>
    </div>
  );
}
