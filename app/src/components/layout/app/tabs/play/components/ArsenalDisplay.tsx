import { motion } from "framer-motion";
import Card, { CardState } from "@/components/game/cards/card/Card";
import { Theme } from "@/enums/themes/Theme";

interface ArsenalDisplayProps {
  theme: Theme;
  selectedSkinId: string;
}

export default function ArsenalDisplay({
  theme,
  selectedSkinId,
}: ArsenalDisplayProps) {
  return (
    <div
      className="fixed w-full flex items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ marginTop: "-10vh" }}
    >
      {/* Arena/Theme Circle */}
      <motion.div className="relative">
        {/* Main arena circle with theme gradient */}
        <div
          className={`w-56 h-56 rounded-full bg-gradient-to-br ${theme.preview}`}
          style={{ opacity: 0.4 }}
        />
        {/* Outer glow */}
        <div
          className={`absolute inset-0 w-56 h-56 rounded-full bg-gradient-to-br ${theme.preview} blur-3xl`}
          style={{ opacity: 0.15, transform: "scale(1.5)" }}
        />
      </motion.div>

      {/* Cards in fan formation */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Card 1 */}
          <motion.div
            className="absolute left-0 bottom-0"
            style={{
              x: -15,
              y: -5,
              scale: 1.25,
              rotate: -10,
            }}
          >
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={selectedSkinId}
            />
          </motion.div>

          {/* Card 2 */}
          <motion.div
            className="relative"
            style={{
              x: 15,
              y: -3,
              scale: 1.25,
              rotate: 10,
            }}
          >
            <Card
              cardState={CardState.CARD_BACK}
              size="small"
              skinId={selectedSkinId}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
