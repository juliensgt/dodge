import { Size } from "@/scripts/references/playerLayouts";

interface CyberSkinProps {
  size?: Size;
}

export default function CyberSkin({ size = "small" }: CyberSkinProps) {
  const isSmall = size === "small" || size === "xsmall" || size === "xxsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
      }}
    >
      {/* Motif circuits imprimés */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            fill="none"
            stroke="#00ffcc"
            strokeWidth="2"
          />
          <line
            x1="20"
            y1="20"
            x2="80"
            y2="20"
            stroke="#00ffcc"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="80"
            x2="80"
            y2="80"
            stroke="#00ffcc"
            strokeWidth="1"
          />
          <line
            x1="20"
            y1="20"
            x2="20"
            y2="80"
            stroke="#00ffcc"
            strokeWidth="1"
          />
          <line
            x1="80"
            y1="20"
            x2="80"
            y2="80"
            stroke="#00ffcc"
            strokeWidth="1"
          />
          <circle cx="20" cy="20" r="2" fill="#00ffcc" />
          <circle cx="80" cy="20" r="2" fill="#00ffcc" />
          <circle cx="20" cy="80" r="2" fill="#00ffcc" />
          <circle cx="80" cy="80" r="2" fill="#00ffcc" />
        </svg>
      </div>

      {/* Lettre D cyber */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Glow externe */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-cyan-400 opacity-60`}
            style={{
              textShadow:
                "0 0 16px #00ffcc, 0 0 32px #00ffcc, 0 0 48px #fff, 0 0 64px #00ffcc",
              transform: "translate(3px, 3px)",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-white`}
            style={{
              textShadow: "0 0 8px #00ffcc, 0 0 16px #fff, 0 0 32px #00ffcc",
              fontFamily: "'Orbitron', sans-serif",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures néon */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cyan-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cyan-400 rounded-br-lg"></div>

      {/* Police futuriste */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap");
      `}</style>
    </div>
  );
}
