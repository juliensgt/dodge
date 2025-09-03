import { useEffect, useRef } from "react";

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
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--secondary-color)]/30 via-[var(--secondary-color)]/20 to-transparent backdrop-blur-xl rounded-b-3xl" />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--action-chat-background-color)]/20 via-transparent to-transparent backdrop-blur-lg rounded-b-3xl" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--action-chat-border-color)]/40 to-transparent" />

      {/* Contenu du countdown */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 md:px-8">
        {title && (
          <div className="mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--text-color)]/10 blur-lg scale-110" />
              <h1 className="relative uppercase text-[2.5vh] md:text-[3.5vh] font-semibold tracking-[0.3px] text-[var(--text-color)]/80 drop-shadow-sm">
                {title}
              </h1>
            </div>
          </div>
        )}

        {/* Timer avec design circulaire simple */}
        <div className="relative mb-2 md:mb-4">
          {/* Effet de glow externe */}
          <div className="absolute inset-0 bg-[var(--action-choice-active-color)]/20 rounded-full blur-xl scale-110" />

          {/* Cercle principal du timer */}
          <div className="relative w-16 h-16 md:w-20 md:h-20 mx-auto">
            {/* Cercle de fond avec transparence */}
            <div className="absolute inset-0 bg-[var(--action-choice-active-color)]/20 backdrop-blur-sm rounded-full border-2 border-[var(--action-choice-active-color)]/40 shadow-lg" />

            {/* Cercle intérieur avec le chiffre */}
            <div className="absolute inset-1.5 md:inset-2 bg-[var(--action-choice-active-color)]/30 backdrop-blur-md rounded-full border border-[var(--action-choice-active-color)]/50 flex items-center justify-center">
              <h2 className="text-lg md:text-2xl font-bold text-[var(--text-color)] drop-shadow-sm">
                {time}
              </h2>
            </div>
          </div>
        </div>

        {subtitle && (
          <div className="max-w-xs md:max-w-md px-2">
            <p className="text-sm md:text-[2vh] text-[var(--secondary-text-color)] font-medium leading-relaxed">
              {subtitle}
            </p>
          </div>
        )}
      </div>

      {/* Effet de particules décoratives - adaptées pour mobile */}
      <div className="absolute top-3 left-6 md:top-4 md:left-8 w-1.5 h-1.5 md:w-2 md:h-2 bg-[var(--action-choice-active-color)]/60 rounded-full animate-pulse" />
      <div className="absolute top-6 right-8 md:top-8 md:right-12 w-1 h-1 md:w-1.5 md:h-1.5 bg-[var(--secondary-text-color)]/40 rounded-full animate-pulse delay-300" />
      <div className="absolute bottom-4 left-12 md:bottom-6 md:left-16 w-0.5 h-0.5 md:w-1 md:h-1 bg-[var(--action-choice-active-color)]/40 rounded-full animate-pulse delay-700" />

      {/* Particules supplémentaires - seulement sur desktop */}
      <div className="hidden md:block absolute top-12 left-1/4 w-1 h-1 bg-[var(--secondary-color)]/50 rounded-full animate-pulse delay-500" />
      <div className="hidden md:block absolute top-16 right-1/3 w-1.5 h-1.5 bg-[var(--action-choice-active-color)]/35 rounded-full animate-pulse delay-200" />
      <div className="hidden md:block absolute bottom-8 right-8 w-0.5 h-0.5 bg-[var(--secondary-text-color)]/60 rounded-full animate-pulse delay-900" />
      <div className="hidden md:block absolute top-6 left-1/2 w-1 h-1 bg-[var(--action-chat-border-color)]/45 rounded-full animate-pulse delay-600" />
      <div className="hidden md:block absolute bottom-12 left-1/3 w-0.5 h-0.5 bg-[var(--action-choice-active-color)]/30 rounded-full animate-pulse delay-400" />
      <div className="hidden md:block absolute top-20 right-1/4 w-1 h-1 bg-[var(--secondary-color)]/40 rounded-full animate-pulse delay-800" />
      <div className="hidden md:block absolute bottom-4 right-1/2 w-1.5 h-1.5 bg-[var(--action-choice-active-color)]/25 rounded-full animate-pulse delay-1000" />
    </div>
  );
}
