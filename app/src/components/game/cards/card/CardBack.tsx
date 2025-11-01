import { memo, Suspense } from "react";
import { useCardSkin } from "../../../../hooks/useCardSkin";
import { Size } from "@/scripts/references/playerLayouts";

interface CardBackProps {
  size?: Size;
  skinId?: string;
}

// Fallback simple pour les skins en chargement
function SkinFallback({ size }: { size: Size }) {
  const sizeClasses = {
    large: "w-24 h-32",
    medium: "w-20 h-28",
    small: "w-16 h-20",
    xsmall: "w-10 h-14",
    xxsmall: "w-8 h-11",
  };

  return (
    <div
      className={`${sizeClasses[size]} rounded-lg bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse`}
    />
  );
}

function CardBack({ size = "small", skinId }: CardBackProps) {
  const { getSkin } = useCardSkin();
  const skin = getSkin(skinId || "default");
  const SkinComponent = skin.component;

  return (
    <Suspense fallback={<SkinFallback size={size} />}>
      <SkinComponent size={size} />
    </Suspense>
  );
}

// Mémoriser CardBack pour éviter les re-rendus inutiles
// Comparaison personnalisée basée sur size et skinId
export default memo(CardBack, (prevProps, nextProps) => {
  return (
    prevProps.size === nextProps.size && prevProps.skinId === nextProps.skinId
  );
});
