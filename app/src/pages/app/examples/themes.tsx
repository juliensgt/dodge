import { useGradient } from "@/hooks/useGradient";
import ThemeSelector from "@/components/utils/selectors/ThemeSelector";
import ActionButton from "@/components/utils/buttons/ActionButton";
import GradientShowcase from "@/components/utils/examples/GrandientShowcase";

export default function ThemesExample() {
  const { getGradient, GradientType, ColorType } = useGradient();

  return (
    <div
      className={`min-h-screen ${getGradient(GradientType.BACKGROUND_MAIN, "to-br")} p-8`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Thèmes de Dégradés
            </h1>
            <p className="text-white/70">
              Testez différents thèmes de couleurs pour personnaliser votre
              expérience
            </p>
          </div>
          <ThemeSelector />
        </div>

        {/* Gradient Showcase */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Tous les Dégradés
          </h2>
          <GradientShowcase />
        </div>

        {/* Action Buttons Test */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8">
          <h2 className="text-2xl font-semibold text-white mb-4">
            Boutons d&apos;Action
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Avec Gradients
              </h3>
              <div className="flex flex-wrap gap-4">
                <ActionButton
                  onClick={() => console.log("Primary clicked")}
                  label="Primary"
                  gradient={{ gradientType: GradientType.PRIMARY }}
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-white mb-2">
                Avec Couleurs
              </h3>
              <div className="flex flex-wrap gap-4">
                <ActionButton
                  onClick={() => console.log("Primary color clicked")}
                  label="Primary"
                  color={{ color: ColorType.PRIMARY }}
                />
                <ActionButton
                  onClick={() => console.log("Success color clicked")}
                  label="Success"
                  color={{ color: ColorType.SUCCESS }}
                />
                <ActionButton
                  onClick={() => console.log("Warning color clicked")}
                  label="Warning"
                  color={{ color: ColorType.WARNING }}
                />
                <ActionButton
                  onClick={() => console.log("Danger color clicked")}
                  label="Danger"
                  color={{ color: ColorType.DANGER }}
                />
                <ActionButton
                  onClick={() => console.log("Info color clicked")}
                  label="Info"
                  color={{ color: ColorType.INFO }}
                />
                <ActionButton
                  onClick={() => console.log("Transparent color clicked")}
                  label="Transparent"
                  color={{ color: ColorType.TRANSPARENT }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
