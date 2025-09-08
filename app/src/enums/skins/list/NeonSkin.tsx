import { Size } from "@/scripts/references/playerLayouts";

interface NeonSkinProps {
  size?: Size;
}

export default function NeonSkin({ size = "small" }: NeonSkinProps) {
  const isSmall = size === "small" || size === "xsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
      }}
    >
      {/* Motif de fond néon */}
      <div className="absolute inset-0 opacity-30">
        {/* Grille néon */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "20px 20px",
          }}
        ></div>

        {/* Cercles néon */}
        <div className="absolute top-2 left-2 w-6 h-6 border border-cyan-400 rounded-full animate-pulse"></div>
        <div
          className="absolute top-2 right-2 w-4 h-4 border border-cyan-400 rounded-full animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute bottom-2 left-2 w-4 h-4 border border-cyan-400 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-2 right-2 w-6 h-6 border border-cyan-400 rounded-full animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* Lettre D néon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Glow externe */}
          <div
            className={`absolute ${isSmall ? "text-4xl" : "text-xl"} font-black text-black/75 opacity-50`}
            style={{
              textShadow:
                "0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff",
              transform: "translate(0px, 0px)",
              animation: "neonGlow 2s ease-in-out infinite alternate",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-black/75 font-['MT']`}
            style={{
              textShadow:
                "0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff",
              filter: "drop-shadow(0 0 5px #00ffff)",
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

      {/* Effet de scan */}
      <div
        className="absolute top-0 left-0 w-full h-full opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(0,255,255,0.3) 50%, transparent 100%)",
          transform: "translateX(-100%)",
          animation: "scan 4s infinite linear",
        }}
      ></div>

      <style jsx>{`
        @keyframes neonGlow {
          from {
            text-shadow:
              0 0 20px #00ffff,
              0 0 40px #00ffff,
              0 0 60px #00ffff;
          }
          to {
            text-shadow:
              0 0 10px #00ffff,
              0 0 20px #00ffff,
              0 0 30px #00ffff;
          }
        }

        @keyframes scan {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
