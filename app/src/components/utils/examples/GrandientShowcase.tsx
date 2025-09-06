import { useGradient } from "@/hooks/useGradient";

export default function GrandientShowcase() {
  const { getGradient, GradientType } = useGradient();
  const gradientExamples = [
    { type: GradientType.PRIMARY, label: "Primary" },
    { type: GradientType.AVATAR_DEFAULT, label: "Avatar Default" },
    { type: GradientType.BACKGROUND_MAIN, label: "Background Main" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {gradientExamples.map((example) => (
        <div
          key={example.type}
          className={`p-4 rounded-lg ${getGradient(example.type, "to-r")}`}
        >
          <div className="text-white font-medium">{example.label}</div>
        </div>
      ))}
    </div>
  );
}
