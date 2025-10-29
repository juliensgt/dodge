import { useCollection } from "@/contexts/CollectionContext";
import { getCardSkin } from "@/enums/skins/SkinManager";

export function useCardSkin() {
  const { setSkin } = useCollection();

  return {
    setSkin: (skinId: string) => setSkin(skinId),
    getSkin: (skinId: string) => getCardSkin(skinId),
  };
}
