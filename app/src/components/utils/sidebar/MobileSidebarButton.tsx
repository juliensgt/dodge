import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
      className="fixed top-1 right-2 z-50 p-2 bg-gray-400/80 backdrop-blur-sm text-white rounded-lg shadow-lg hover:bg-gray-400 transition-all duration-200 select-none"
      aria-label={isOpen ? "Fermer la sidebar" : "Ouvrir la sidebar"}
    >
      <div className="w-2 h-2 flex flex-col justify-center items-center">
        <FontAwesomeIcon icon={faBars} className="w-2 h-2" />
      </div>
    </button>
  );
}
