import { useIsMobile } from "@/hooks/useIsMobile";
import { useTranslation } from "@/hooks/useTranslation";

interface ShopTabTitleProps {
  title: string;
  subtitle: string;
  rightSide?: React.ReactNode;
  bottomSide?: React.ReactNode;
}

export default function ShopTabTitle({
  title,
  subtitle,
  rightSide,
  bottomSide,
}: ShopTabTitleProps) {
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  return (
    <>
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h2
            className={`${isMobile ? "text-2xl" : "text-4xl"} font-bold text-white`}
          >
            {t(title)}
          </h2>
          <p className={`${isMobile ? "text-sm" : "text-lg"} text-white/80`}>
            {t(subtitle)}
          </p>
        </div>
        {!isMobile && rightSide}
      </div>
      {isMobile && rightSide}
      {bottomSide}
    </>
  );
}
