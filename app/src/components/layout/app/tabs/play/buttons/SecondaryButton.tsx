import { motion } from "framer-motion";
import Image from "next/image";

interface SecondaryButtonProps {
  logo: string;
  logoAlt: string;
  title: string;
  description: string;
  colorTheme: "blue" | "purple" | "emerald";
  onClick: () => void;
}

export default function SecondaryButton({
  logo,
  logoAlt,
  title,
  description,
  colorTheme,
  onClick,
}: SecondaryButtonProps) {
  const gradientColors = {
    blue: "from-blue-600 via-indigo-600 to-purple-800",
    purple: "from-indigo-600 via-purple-600 to-purple-800",
    emerald: "from-emerald-600 via-teal-600 to-cyan-700",
  };

  const hoverColors = {
    blue: "from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/20 group-hover:to-indigo-500/20",
    purple:
      "from-purple-500/0 to-indigo-500/0 group-hover:from-purple-500/20 group-hover:to-indigo-500/20",
    emerald:
      "from-emerald-500/0 to-cyan-500/0 group-hover:from-emerald-500/20 group-hover:to-cyan-500/20",
  };

  const textColors = {
    blue: "group-hover:text-blue-300",
    purple: "group-hover:text-purple-300",
    emerald: "group-hover:text-emerald-300",
  };

  const lineColors = {
    blue: "via-blue-500",
    purple: "via-purple-500",
    emerald: "via-emerald-500",
  };

  return (
    <motion.div
      className="group relative cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${gradientColors[colorTheme]} p-[2px] shadow-lg`}
      >
        <div className="relative rounded-xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 px-6 py-4 flex items-center gap-4">
          <div
            className={`absolute inset-0 bg-gradient-to-r ${hoverColors[colorTheme]} transition-all duration-500 rounded-xl`}
          />

          {/* Logo */}
          <div className="relative z-10 group-hover:scale-110 transition-transform duration-300">
            <Image src={logo} alt={logoAlt} width={60} height={60} />
          </div>

          {/* Titre */}
          <div className="relative z-10 flex-1">
            <h3
              className={`text-xl font-lucky text-white mb-1 ${textColors[colorTheme]} transition-colors`}
            >
              {title}
            </h3>
            <p className="text-sm text-gray-400/75 font-passionone">
              {description}
            </p>
          </div>

          {/* Ligne décorative */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${lineColors[colorTheme]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
          />
        </div>
      </div>
    </motion.div>
  );
}
