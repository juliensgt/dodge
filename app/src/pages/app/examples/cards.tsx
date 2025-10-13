import SkeletonDemo from "@/components/demo/SkeletonDemo";
import CardSystemDemo from "@/components/demo/CardSystemDemo";
import SkeletonMobileDemo from "@/components/demo/SkeletonMobileDemo";
import { useGradient } from "@/hooks/useGradient";
import { GradientType } from "@/enums/themes/list/PurpleTheme";

export default function Cards() {
  const { getGradient } = useGradient();

  return (
    <div
      className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} font-['MT']`}
    >
      <div className="p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-6xl font-bold text-white mb-4">
              Exemples de Cartes
            </h1>
            <p className="text-lg text-white/70">
              Découvrez les différents composants de cartes disponibles dans
              l&apos;application
            </p>
          </div>

          <CardSystemDemo />

          <div className="mt-12 space-y-8">
            <SkeletonDemo />
          </div>
        </div>
      </div>
    </div>
  );
}
