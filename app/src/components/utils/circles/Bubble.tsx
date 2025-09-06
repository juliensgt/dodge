interface BubbleProps {
  position: string;
}

export default function Bubble(props: BubbleProps) {
  const randomOpacity = Math.random() * 0.15 + 0.02;
  const randomDelay = Math.random() * 2000 + 500;
  const randomDuration = Math.random() * 2 + 1.5; // Random duration between 1.5s and 3.5s
  const maxOpacity = Math.min(randomOpacity + 0.1, 0.3); // Slightly brighter than base, capped at 30%

  return (
    <div
      className={`hidden md:block absolute ${props.position} w-1.5 h-1.5 bg-white rounded-full`}
      style={{
        animationDelay: `${randomDelay}ms`,
        animation: `bubblePulse ${randomDuration}s cubic-bezier(0.4, 0, 0.6, 1) infinite`,
        opacity: randomOpacity,
      }}
    >
      <style jsx>{`
        @keyframes bubblePulse {
          0%,
          100% {
            opacity: ${randomOpacity};
          }
          50% {
            opacity: ${maxOpacity};
          }
        }
      `}</style>
    </div>
  );
}
