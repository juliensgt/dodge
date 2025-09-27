import { useState } from "react";
import { useAnimationStore } from "@/store/animations";

export default function AnimationSettings() {
  const [useAdvancedAnimation, setUseAdvancedAnimation] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const { isCardDistributionActive } = useAnimationStore();

  return (
    <div className="fixed top-4 left-4 z-50 bg-white p-4 rounded-lg shadow-lg max-w-xs">
      <h3 className="text-lg font-bold mb-2">Paramètres Animation</h3>
      <div className="space-y-3">
        {/* Type d'animation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type d&apos;animation
          </label>
          <div className="space-y-1">
            <label className="flex items-center">
              <input
                type="radio"
                name="animationType"
                checked={useAdvancedAnimation}
                onChange={() => setUseAdvancedAnimation(true)}
                className="mr-2"
                disabled={isCardDistributionActive}
              />
              <span className="text-sm">Avancée (Framer Motion)</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="animationType"
                checked={!useAdvancedAnimation}
                onChange={() => setUseAdvancedAnimation(false)}
                className="mr-2"
                disabled={isCardDistributionActive}
              />
              <span className="text-sm">Basique (CSS)</span>
            </label>
          </div>
        </div>

        {/* Vitesse d'animation */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vitesse: {animationSpeed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={animationSpeed}
            onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
            className="w-full"
            disabled={isCardDistributionActive}
          />
        </div>

        {/* État actuel */}
        <div className="text-xs text-gray-500 pt-2 border-t">
          <div>État: {isCardDistributionActive ? "Active" : "Inactive"}</div>
          <div>Type: {useAdvancedAnimation ? "Avancée" : "Basique"}</div>
          <div>Vitesse: {animationSpeed}x</div>
        </div>
      </div>
    </div>
  );
}
