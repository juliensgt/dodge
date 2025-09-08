import { getCardSkin } from "../../../../enums/skins/SkinManager";
import { useCardSkin } from "../../../../hooks/useCardSkin";
import { Size } from "@/scripts/references/playerLayouts";

interface CardBackProps {
  size?: Size;
  skinId?: string;
}

export default function CardBack({ size = "small", skinId }: CardBackProps) {
  const { selectedSkinId } = useCardSkin();
  const actualSkinId = skinId || selectedSkinId;
  const skin = getCardSkin(actualSkinId);
  const SkinComponent = skin.component;

  return <SkinComponent size={size} />;
}
