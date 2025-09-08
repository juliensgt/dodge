import { Size } from "@/scripts/references/playerLayouts";

interface HeartSkinProps {
  size?: Size;
}

export default function HeartSkin({ size = "small" }: HeartSkinProps) {
  const isSmall = size === "small" || size === "xsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(135deg, #ffb6c1 0%, #ff1744 100%)",
      }}
    >
      {/* Motifs de coeurs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-red-400 opacity-40"
            style={{
              fontSize: `${Math.random() * 1.5 + 1}rem`,
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Lettre D coeur */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-4xl" : "text-xl"} font-black text-pink-300 opacity-60`}
            style={{
              textShadow: "4px 4px 0 #fff, 8px 8px 0 #ff1744",
              fontFamily: "'Dancing Script', cursive",
              transform: "translate(3px, 3px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-4xl" : "text-xl"} font-black text-red-400`}
            style={{
              textShadow: "2px 2px 0 #fff, 4px 4px 0 #ffb6c1",
              fontFamily: "'Dancing Script', cursive",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures coeur */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-red-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-red-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-red-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-red-400 rounded-br-lg"></div>

      {/* Police douce */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap");
      `}</style>
    </div>
  );
}

