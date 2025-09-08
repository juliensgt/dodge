import { Size } from "@/scripts/references/playerLayouts";

interface IceSkinProps {
  size?: Size;
}

export default function IceSkin({ size = "small" }: IceSkinProps) {
  const isSmall = size === "small" || size === "xsmall";

  return (
    <div
      className="card-back w-full h-full relative rounded-lg overflow-hidden shadow-lg"
      style={{
        background:
          "linear-gradient(135deg, #e0f7fa 0%, #81d4fa 50%, #01579b 100%)",
      }}
    >
      {/* Reflets de glace */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="w-full h-full"
        >
          <polygon points="10,90 50,10 90,90" fill="#b3e5fc" opacity="0.3" />
          <polygon points="20,80 50,30 80,80" fill="#fff" opacity="0.2" />
        </svg>
      </div>

      {/* Lettre D glace */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Ombre de la lettre */}
          <div
            className={`absolute ${isSmall ? "text-3xl" : "text-lg"} font-black text-blue-200 opacity-50`}
            style={{
              textShadow: "2px 2px 0 #81d4fa, 4px 4px 0 #fff",
              fontFamily: "'Iceberg', cursive",
              transform: "translate(2px, 2px)",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
          {/* Lettre principale */}
          <div
            className={`relative ${isSmall ? "text-3xl" : "text-lg"} font-black text-white`}
            style={{
              textShadow: "1px 1px 0 #b3e5fc, 2px 2px 0 #81d4fa",
              fontFamily: "'Iceberg', cursive",
            }}
          >
            {isSmall ? "D" : "DODGE"}
          </div>
        </div>
      </div>

      {/* Bordures glace */}
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-blue-200 rounded-tl-lg"></div>
      <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-blue-200 rounded-tr-lg"></div>
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-blue-200 rounded-bl-lg"></div>
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-blue-200 rounded-br-lg"></div>

      {/* Police froide */}
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Iceberg&display=swap");
      `}</style>
    </div>
  );
}

