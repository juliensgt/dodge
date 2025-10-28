export default function GlowingEffect() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent rounded-2xl"
        style={{
          backgroundSize: "200% 100%",
          animation: "shimmer 4s ease-in-out infinite",
        }}
      />
    </div>
  );
}
