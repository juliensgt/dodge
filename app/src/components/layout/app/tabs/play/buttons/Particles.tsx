interface ParticlesProps {
  count?: number;
}

export default function Particles({ count = 3 }: ParticlesProps) {
  const positions = [
    { top: "0.5rem", left: "0.5rem" },
    { top: "0.5rem", right: "0.5rem" },
    { bottom: "0.5rem", left: "1rem" },
    { top: "3rem", left: "4rem" },
    { bottom: "2rem", right: "1rem" },
  ];

  return (
    <>
      {positions.slice(0, count).map((pos, index) => (
        <div
          key={index}
          className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"
          style={{
            ...pos,
            animationDelay: `${index * 75}ms`,
            backgroundColor:
              index === 0
                ? "rgb(250 204 21)"
                : index === 1
                  ? "rgb(251 146 60)"
                  : "rgb(248 113 113)",
          }}
        />
      ))}
    </>
  );
}
