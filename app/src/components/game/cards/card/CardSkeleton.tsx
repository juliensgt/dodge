import { Size } from "@/scripts/references/playerLayouts";

interface CardSkeletonProps {
  size?: Size;
  className?: string;
}

export default function CardSkeleton({
  size = "small",
  className = "",
}: CardSkeletonProps) {
  const sizeClasses = {
    small: "w-16 h-20", // 64px x 80px
    medium: "w-20 h-28", // 80px x 112px
    large: "w-24 h-32", // 96px x 128px
    xsmall: "w-10 h-14", // 40px x 56px
    xxsmall: "w-8 h-12", // 32px x 48px
  };

  return (
    <div
      className={`${sizeClasses[size]} ${className} bg-gray-300 rounded-lg animate-pulse border border-gray-400 shadow-sm`}
    >
      <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center"></div>
    </div>
  );
}
