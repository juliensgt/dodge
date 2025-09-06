import { ColorType, GradientType } from "@/enums/themes/list/PurpleTheme";
import { useGradient } from "@/hooks/useGradient";

interface Gradient {
  gradientType: GradientType;
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
  color: ColorType;
}

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  disabled?: boolean;
  gradient?: Gradient;
  color?: Color;
}

export default function ActionButton(props: ActionButtonProps) {
  const { getGradient, getGradientHover, GradientType, getColor, ColorType } =
    useGradient();
  const gradientType = props.gradient?.gradientType || GradientType.PRIMARY;
  const gradientDirection = props.gradient?.gradientDirection || "to-r";
  const colorClasses = getColor(props.color?.color || ColorType.PRIMARY);
  const gradientClasses = getGradient(gradientType, gradientDirection);
  const hoverClasses = getGradientHover(gradientType, gradientDirection);

  return (
    <button
      onClick={props.onClick}
      className={`${props.gradient ? gradientClasses : ""} ${hoverClasses} ${props.color ? colorClasses : ""} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
        props.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={props.disabled}
    >
      {props.leftSection && props.leftSection}
      <span className="sm:inline">{props.label}</span>
      {props.rightSection && props.rightSection}
    </button>
  );
}
