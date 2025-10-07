interface SparkleProps {
  position: string;
  delay?: number;
  duration?: number;
  size?: "tiny" | "small" | "medium";
}

export default function Sparkle({
  position,
  delay = 0,
  duration = 1.5,
  size = "small",
}: SparkleProps) {
  const sizeClasses = {
    tiny: "w-0.5 h-0.5",
    small: "w-1 h-1",
    medium: "w-1.5 h-1.5",
  };

  const randomRotation = Math.random() * 360;
  const randomScale = 0.8 + Math.random() * 0.4;

  return (
    <div
      className={`absolute ${position} ${sizeClasses[size]} pointer-events-none`}
      style={{
        animationDelay: `${delay}ms`,
        animation: `sparkle ${duration}s ease-in-out infinite`,
        transform: `rotate(${randomRotation}deg) scale(${randomScale})`,
      }}
    >
      <div className="w-full h-full bg-white rounded-full opacity-0" />
      <style jsx>{`
        @keyframes sparkle {
          0%,
          100% {
            opacity: 0;
            transform: rotate(${randomRotation}deg) scale(${randomScale * 0.5});
          }
          20% {
            opacity: 0.8;
            transform: rotate(${randomRotation}deg) scale(${randomScale * 1.2});
          }
          40% {
            opacity: 1;
            transform: rotate(${randomRotation + 45}deg)
              scale(${randomScale * 1.5});
          }
          60% {
            opacity: 0.6;
            transform: rotate(${randomRotation + 90}deg)
              scale(${randomScale * 1.1});
          }
          80% {
            opacity: 0.3;
            transform: rotate(${randomRotation + 135}deg)
              scale(${randomScale * 0.8});
          }
        }
      `}</style>
    </div>
  );
}
