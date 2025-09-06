import { useEffect, useRef } from "react";
import { useGradient } from "@/hooks/useGradient";
import Bubble from "@/components/utils/circles/Bubble";

interface CountdownProps {
  visible: boolean;
  time: number;
  title?: string;
  subtitle?: string;
}

export default function Countdown({
  visible,
  time,
  title,
  subtitle,
}: CountdownProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const { getGradient, GradientType, getColor, ColorType } = useGradient();

  useEffect(() => {
    if (visible && counterRef.current) {
      counterRef.current.style.transform = "translateY(-100px)";
      counterRef.current.style.opacity = "0";

      setTimeout(() => {
        if (counterRef.current) {
          counterRef.current.style.transition = "all 1s ease-out";
          counterRef.current.style.transform = "translateY(0)";
          counterRef.current.style.opacity = "1";
        }
      }, 100);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={counterRef}
      className="font-['MT'] relative w-full h-[20vh] md:h-[25vh] max-h-[150px] md:max-h-[200px] select-none"
    >
      {/* Background avec effets de transparence et blur multiples */}
      <div
        className={`absolute ${getGradient(GradientType.PRIMARY, "to-b")} opacity-30 backdrop-blur-xl rounded-b-3xl`}
      />
      <div
        className={`absolute ${getColor(ColorType.TRANSPARENT)} opacity-20 backdrop-blur-lg rounded-b-3xl`}
      />

      {/* Contenu du countdown */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        {title && (
          <div className="mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-white/10 blur-lg scale-110" />
              <h1 className="relative uppercase text-[2.5vh] md:text-[3.5vh] font-semibold tracking-[0.3px] text-white/80 drop-shadow-sm">
                {title}
              </h1>
            </div>
          </div>
        )}

        {/* Timer avec design circulaire simple */}
        <div className="relative mb-2 md:mb-4">
          {/* Effet de glow externe */}
          <div
            className={`absolute inset-0 ${getColor(ColorType.PRIMARY)} opacity-20 rounded-full blur-xl scale-110`}
          />

          {/* Cercle principal du timer */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto">
            {/* Cercle de fond avec transparence */}
            <div
              className={`absolute inset-0 ${getColor(ColorType.PRIMARY)} opacity-80 backdrop-blur-sm rounded-full border-2 border-white/40 shadow-lg`}
            />

            {/* Cercle intérieur avec le chiffre */}
            <div
              className={`absolute inset-1.5 md:inset-2 ${getColor(ColorType.PRIMARY)} opacity-80 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center`}
            >
              <h2 className="text-lg md:text-2xl font-bold text-white drop-shadow-sm">
                {time}
              </h2>
            </div>
          </div>
        </div>

        {subtitle && (
          <div className="max-w-xs md:max-w-md px-2">
            <p className="text-sm md:text-[2vh] text-white/70 font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Effet de particules décoratives - adaptées pour mobile */}
      <Bubble position="top-3 left-6" />
      <Bubble position="top-6 right-8" />
      <Bubble position="bottom-4 left-12" />
      <Bubble position="bottom-4 left-12" />
      <Bubble position="top-20 right-1/4" />
      <Bubble position="bottom-4 right-1/2" />

      {/* Particules supplémentaires - seulement sur desktop */}
      <Bubble position="top-12 left-1/4" />
      <Bubble position="top-16 right-1/3" />
      <Bubble position="bottom-8 right-8" />
      <Bubble position="top-6 left-1/2" />
      <Bubble position="bottom-12 left-1/3" />
      <Bubble position="top-20 right-1/4" />
      <Bubble position="bottom-4 right-1/2" />
    </div>
  );
}
