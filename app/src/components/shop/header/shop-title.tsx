import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslation } from "@/hooks/useTranslation";

export default function ShopTitle() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  return (
    <h1
      className={`${
        isMobile ? "text-3xl" : "text-6xl mb-4"
      } font-bold text-white drop-shadow-2xl`}
    >
      {t("BOUTIQUE")}
    </h1>
  );
}
