import { useCardSkin } from "../../../../hooks/useCardSkin";
import { Size } from "@/scripts/references/playerLayouts";

interface CardBackProps {
  size?: Size;
  skinId?: string;
}

export default function CardBack({ size = "small", skinId }: CardBackProps) {
  const { getSkin } = useCardSkin();
  const skin = getSkin(skinId || "default");

  return <skin.component size={size} />;
}
