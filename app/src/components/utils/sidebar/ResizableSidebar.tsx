import { ReactNode } from "react";

interface ResizableSidebarProps {
  value: number;
  onChange: (value: number) => void;
  children: ReactNode;
  isMobile?: boolean;
  isOpen?: boolean;
}

export default function ResizableSidebar({
  value,
  onChange,
  children,
  isMobile = false,
  isOpen = true,
}: ResizableSidebarProps) {
  const handleMouseDown = (e: React.MouseEvent) => {
    // Désactiver le redimensionnement sur mobile
    if (isMobile) return;

    const startX = e.clientX;
    const startWidth = value;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = startX - e.clientX;
      const newWidth = Math.max(
        0,
        Math.min(50, startWidth + (deltaX / window.innerWidth) * 100)
      );
      onChange(newWidth);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Styles pour mobile vs desktop
  const mobileStyles = isMobile
    ? {
        position: "fixed" as const,
        top: 0,
        right: 0,
        height: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        minWidth: "100vw",
        transform: isOpen ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
        zIndex: 40,
      }
    : {
        width: `${value}vw`,
        minWidth: "300px",
        maxWidth: "50vw",
      };

  return (
    <div
      className={`rounded-lg relative bg-[var(--text-color)]/5`}
      style={mobileStyles}
    >
      {!isMobile && (
        <div
          className="absolute left-0 top-0 w-1 h-full cursor-col-resize z-10"
          onMouseDown={handleMouseDown}
        />
      )}

      {/* Overlay pour fermer sur mobile */}
      {isMobile && isOpen && (
        <div
          className="absolute inset-0 bg-black/20 -z-10"
          onClick={() => onChange(0)}
        />
      )}

      <div className="h-full flex flex-col">{children}</div>
    </div>
  );
}
