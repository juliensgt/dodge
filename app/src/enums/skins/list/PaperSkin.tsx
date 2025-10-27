import { Size } from "@/scripts/references/playerLayouts";

interface PaperSkinProps {
  size?: Size;
}

export default function PaperSkin({ size = "small" }: PaperSkinProps) {
  const isSmall = size === "small" || size === "xsmall" || size === "xxsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "repeating-linear-gradient(135deg, #f5f5dc 0 20px, #e0e0c0 20px 40px)",
        boxShadow: "0 2px 8px #bdbdbd, 0 0 0 4px #fff inset",
      }}
    >
      {/* Texture froissée */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <filter id="crumple">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.03"
              numOctaves="3"
              result="turb"
            />
            <feDisplacementMap
              in2="turb"
              in="SourceGraphic"
              scale="6"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
          <rect width="100" height="100" fill="#fff" filter="url(#crumple)" />
        </svg>
      </div>

      {/* Lettre D papier */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-gray-400 opacity-50`}
            style={{
              textShadow: "2px 2px 0 #e0e0c0",
              fontFamily: "'Indie Flower', cursive",
              transform: "translate(2px, 2px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-gray-700`}
            style={{
              textShadow: "1px 1px 0 #fff, 2px 2px 0 #e0e0c0",
              fontFamily: "'Indie Flower', cursive",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures déchirées */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-dashed border-gray-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-dashed border-gray-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-dashed border-gray-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-dashed border-gray-400 rounded-br-lg"></div>

      {/* Police effet manuscrit */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap");
      `}</style>
    </div>
  );
}
