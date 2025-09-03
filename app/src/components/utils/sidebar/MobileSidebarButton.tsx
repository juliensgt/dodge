interface MobileSidebarButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function MobileSidebarButton({
  isOpen,
  onToggle,
}: MobileSidebarButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed top-4 right-4 z-50 p-3 bg-[var(--action-choice-active-color)]/80 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-[var(--action-choice-active-color)] transition-all duration-200 select-none"
      aria-label={isOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
    >
      <div className="w-6 h-6 flex flex-col justify-center items-center">
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "rotate-45 translate-y-0.5" : "-translate-y-1"
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`block w-5 h-0.5 bg-white transition-all duration-200 ${
            isOpen ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
          }`}
        />
      </div>
    </button>
  );
}
