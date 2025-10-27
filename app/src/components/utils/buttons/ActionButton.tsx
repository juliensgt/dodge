import { useGradient } from "@/hooks/useGradient";

interface Gradient {
  gradientType: string;
  gradientDirection?:
    | "to-r"
    | "to-l"
    | "to-b"
    | "to-br"
    | "to-bl"
    | "to-t"
    | "to-tr"
    | "to-tl";
}

interface Color {
  color: string;
}

interface ActionButtonProps {
  onClick: () => void;
  label?: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  disabled?: boolean;
  gradient?: Gradient;
  color?: Color;
  size?: "sm" | "md" | "lg";
}

export default function ActionButton(props: ActionButtonProps) {
  const { getGradient, getGradientHover, GradientType, getColor, ColorType } =
    useGradient();
  const gradientType = props.gradient?.gradientType || GradientType.PRIMARY;
  const gradientDirection = props.gradient?.gradientDirection || "to-r";
  const colorClasses = getColor(props.color?.color || ColorType.PRIMARY);
  const gradientClasses = getGradient(gradientType, gradientDirection);
  const hoverClasses = getGradientHover(gradientType, gradientDirection);

  const sizeClasses =
    props.size === "sm"
      ? "h-7 px-2 text-xs"
      : props.size === "lg"
        ? "h-12 px-6 text-lg"
        : "h-10 px-4 text-base";

  return (
    <button
      onClick={props.onClick}
      className={`${props.gradient ? gradientClasses : ""} ${hoverClasses} ${props.color ? colorClasses : ""} ${sizeClasses} text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={props.disabled}
    >
      {props.leftSection && props.leftSection}
      {props.label && <span className="sm:inline">{props.label}</span>}
      {props.rightSection && props.rightSection}
    </button>
  );
}
