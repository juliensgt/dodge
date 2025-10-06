import { useEffect, useRef, useState } from "react";
import { useGradient } from "@/hooks/useGradient";
import Sparkle from "@/components/utils/effects/Sparkle";
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSparkles, setShowSparkles] = useState(true);
  const [previousTime, setPreviousTime] = useState(time);
  const counterRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<SVGCircleElement>(null);
  const { getGradient, GradientType, getColor, ColorType } = useGradient();

  // Animation for countdown number changes
  useEffect(() => {
    if (time !== previousTime && numberRef.current) {
      setIsAnimating(true);
      setShowSparkles(true);

      // Trigger number animation
      numberRef.current.style.transform = "scale(1.3) rotate(5deg)";
      numberRef.current.style.filter = "brightness(1.5)";

      setTimeout(() => {
        if (numberRef.current) {
          numberRef.current.style.transform = "scale(1) rotate(0deg)";
          numberRef.current.style.filter = "brightness(1)";
          setIsAnimating(false);
        }
      }, 300);

      // Hide sparkles after animation
      setTimeout(() => {
        setShowSparkles(false);
      }, 1000);

      setPreviousTime(time);
    }
  }, [time, previousTime]);

  // Initial entrance animation
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

        {/* Timer avec design circulaire animé */}
        <div className="relative mb-2 md:mb-4">
          {/* Effet de glow externe pulsant */}
          <div
            className={`absolute inset-0 ${getColor(ColorType.PRIMARY)} opacity-20 rounded-full blur-xl scale-110 animate-pulse`}
          />

          {/* Cercle principal du timer */}
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto">
            {/* Progress ring SVG */}
            <svg
              className="absolute inset-0 w-full h-full transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.1)"
                strokeWidth="3"
              />
              {/* Progress circle */}
              <circle
                ref={progressRef}
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255, 255, 255, 0.8)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - time / 10)}`}
                className="transition-all duration-1000 ease-out"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))",
                }}
              />
            </svg>

            {/* Cercle de fond avec transparence */}
            <div
              className={`absolute inset-0 ${getColor(ColorType.PRIMARY)} opacity-80 backdrop-blur-sm rounded-full border-2 border-white/40 shadow-lg transition-all duration-300 ${
                isAnimating ? "scale-110 shadow-2xl" : "scale-100"
              }`}
            />

            {/* Cercle intérieur avec le chiffre */}
            <div
              className={`absolute inset-1.5 md:inset-2 ${getColor(ColorType.PRIMARY)} opacity-80 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center transition-all duration-300 ${
                isAnimating ? "scale-105" : "scale-100"
              }`}
            >
              <h2
                ref={numberRef}
                className={`text-xl md:text-3xl font-bold text-white drop-shadow-sm transition-all duration-300 ${
                  isAnimating ? "text-yellow-200" : "text-white"
                }`}
                style={{
                  textShadow: isAnimating
                    ? "0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.4)"
                    : "0 2px 4px rgba(0, 0, 0, 0.3)",
                }}
              >
                {time}
              </h2>
            </div>

            {/* Sparkle burst effect when countdown changes */}
            {showSparkles && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(12)].map((_, i) => (
                  <Sparkle
                    key={i}
                    position="absolute"
                    delay={i * 50}
                    duration={1.2}
                    size={
                      i % 3 === 0 ? "medium" : i % 2 === 0 ? "small" : "tiny"
                    }
                  />
                ))}
              </div>
            )}
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
