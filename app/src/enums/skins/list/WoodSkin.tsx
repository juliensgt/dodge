import { Size } from "@/scripts/references/playerLayouts";

interface WoodSkinProps {
  size?: Size;
}

export default function WoodSkin({ size = "small" }: WoodSkinProps) {
  const isSmall = size === "small" || size === "xsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "repeating-linear-gradient(120deg, #a0522d 0 20px, #deb887 20px 40px)",
      }}
    >
      {/* Veines du bois */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <path
            d="M10,90 Q30,70 50,90 T90,90"
            stroke="#8b5c2d"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M20,80 Q40,60 60,80 T80,80"
            stroke="#deb887"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* Lettre D bois */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-900 opacity-40`}
            style={{
              textShadow: "2px 2px 0 #deb887, 4px 4px 0 #fff8dc",
              fontFamily: "'Rye', cursive",
              transform: "translate(2px, 2px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-yellow-800`}
            style={{
              textShadow: "1px 1px 0 #fff8dc, 2px 2px 0 #deb887",
              fontFamily: "'Rye', cursive",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures bois */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-yellow-900 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-yellow-900 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-yellow-900 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-yellow-900 rounded-br-lg"></div>

      {/* Police rustique */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rye&display=swap");
      `}</style>
    </div>
  );
}

