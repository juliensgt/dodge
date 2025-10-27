import { Size } from "@/scripts/references/playerLayouts";

interface BarbieSkinProps {
  size?: Size;
}

export default function BarbieSkin({ size = "small" }: BarbieSkinProps) {
  const isSmall = size === "small" || size === "xsmall" || size === "xxsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #ffb6e9 0%, #ff69b4 50%, #ffb6e9 100%)",
      }}
    >
      {/* Paillettes et coeurs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white opacity-60"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              top: `${Math.random() * 95}%`,
              left: `${Math.random() * 95}%`,
              boxShadow: `0 0 8px #fff, 0 0 16px #ff69b4`,
              animation: "shine 2s infinite alternate",
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
        <div
          className="absolute top-4 left-4 text-pink-400 opacity-70"
          style={{ fontSize: "2rem" }}
        >
          ♥
        </div>
        <div
          className="absolute bottom-4 right-4 text-pink-400 opacity-70"
          style={{ fontSize: "2rem" }}
        >
          ♥
        </div>
      </div>

      {/* Lettre D Barbie */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-4xl" : "text-xl"} font-black text-pink-300 opacity-60`}
            style={{
              textShadow: "4px 4px 0 #fff, 8px 8px 0 #ff69b4",
              fontFamily: "'Pacifico', cursive",
              transform: "translate(3px, 3px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-4xl" : "text-xl"} font-black text-pink-600`}
            style={{
              textShadow: "2px 2px 0 #fff, 4px 4px 0 #ffb6e9",
              fontFamily: "'Pacifico', cursive",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures Barbie */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-pink-400 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-pink-400 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-pink-400 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-pink-400 rounded-br-lg"></div>

      {/* Police glamour */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Pacifico&display=swap");
        @keyframes shine {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
