interface TooltipTextProps {
  text: string;
  className?: string;
}

export default function TooltipText({
  text,
  className = "",
}: TooltipTextProps) {
  return (
    <div className={`tooltip group relative select-none ${className}`}>
      <div className="tooltip-content absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}
