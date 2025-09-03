interface CircleProps {
  size: string;
  className?: string;
}

export default function Circle({ size, className = "" }: CircleProps) {
  return (
    <div
      className={`circle absolute rounded-full border-4 border-white/20 select-none ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
}
