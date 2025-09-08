import { Size } from "@/scripts/references/playerLayouts";

interface MilitarySkinProps {
  size?: Size;
}

export default function MilitarySkin({ size = "small" }: MilitarySkinProps) {
  const isSmall = size === "small" || size === "xsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "repeating-linear-gradient(135deg, #556b2f 0 20px, #8f9779 20px 40px, #a2a77f 40px 60px, #3b5323 60px 80px)",
      }}
    >
      {/* Motif camouflage */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <ellipse cx="20" cy="30" rx="18" ry="8" fill="#8f9779" />
          <ellipse cx="60" cy="60" rx="22" ry="10" fill="#3b5323" />
          <ellipse cx="80" cy="20" rx="12" ry="6" fill="#a2a77f" />
          <ellipse cx="40" cy="80" rx="16" ry="7" fill="#556b2f" />
        </svg>
      </div>

      {/* Lettre D militaire */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-green-900 opacity-50`}
            style={{
              textShadow: "2px 2px 0 #a2a77f, 4px 4px 0 #3b5323",
              fontFamily: "'Staatliches', sans-serif",
              transform: "translate(2px, 2px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-green-700`}
            style={{
              textShadow: "1px 1px 0 #8f9779, 2px 2px 0 #a2a77f",
              fontFamily: "'Staatliches', sans-serif",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures militaires */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-green-900 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-green-900 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-green-900 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-green-900 rounded-br-lg"></div>

      {/* Police robuste */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Staatliches&display=swap");
      `}</style>
    </div>
  );
}

