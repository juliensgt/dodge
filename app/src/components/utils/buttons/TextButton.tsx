interface TextButtonProps {
  label: string;
  isActive?: boolean;
  progress?: number;
  onClick?: () => void;
}

export default function TextButton({
  label,
  isActive = false,
  progress = 0,
  onClick,
}: TextButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 select-none ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "bg-gray-600 text-white hover:bg-gray-700"
      }`}
    >
      {label}
      {progress > 0 && (
        <div className="w-full bg-gray-300 rounded-full h-1 mt-1">
          <div
            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </button>
  );
}
