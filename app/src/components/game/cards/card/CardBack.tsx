import { getCardSkin } from "../../../../enums/skins/SkinManager";
import { useCardSkin } from "../../../../hooks/useCardSkin";

interface CardBackProps {
  size?: "small" | "medium" | "big";
  skinId?: string;
}

export default function CardBack({ size = "small", skinId }: CardBackProps) {
  const { selectedSkinId } = useCardSkin();
  const actualSkinId = skinId || selectedSkinId;
  const skin = getCardSkin(actualSkinId);
  const SkinComponent = skin.component;

  return <SkinComponent size={size} />;
}
