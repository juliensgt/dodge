import ActionButton from "@/components/utils/buttons/ActionButton";
import { useTranslation } from "@/hooks/useTranslation";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useIsMobile } from "@/hooks/useIsMobile";
import { ColorType } from "@/enums/themes/list/PurpleTheme";

export default function Chat() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const messages = [
    { message: "Bienvenue dans la partie !", player: "Système", time: "14:32" },
    { message: "Salut !", player: "Joueur1", time: "14:33" },
    { message: "Comment ça va ?", player: "Joueur2", time: "14:34" },
    { message: "Je vais bien, merci !", player: "Joueur3", time: "14:35" },
    {
      message: "Tu as vu le match de football ?",
      player: "Joueur4",
      time: "14:36",
    },
    { message: "Oui, c'était génial !", player: "Joueur5", time: "14:37" },
    {
      message: "Tu as vu le match de football ?",
      player: "Joueur6",
      time: "14:38",
    },
    { message: "Oui, c'était génial !", player: "Joueur7", time: "14:39" },
    {
      message: "Tu as vu le match de football ?",
      player: "Joueur8",
      time: "14:40",
    },
    { message: "Oui, c'était génial !", player: "Joueur9", time: "14:41" },
    {
      message: "Tu as vu le match de football ?",
      player: "Joueur10",
      time: "14:42",
    },
    {
      message:
        "Oui, c'était génial ! Mais c'est terminé maintenant ! On va commencer une nouvelle partie !",
      player: "Joueur11",
      time: "14:43",
    },
    {
      message: "Tu as vu le match de football ?",
      player: "Joueur12",
      time: "14:44",
    },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 chat-scrollbar">
        {/* TODO: Implémenter l'affichage des messages de chat */}
        {messages.map((message) => (
          <ChatMessage
            key={message.message}
            message={message.message}
            player={message.player}
            time={message.time}
          />
        ))}
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder={t("Tapez votre message...")}
          className="flex-1 px-3 py-2 bg-[var(--action-chat-background-color)]/60 backdrop-blur-sm border border-[var(--action-chat-border-color)]/50 rounded-lg text-[var(--action-chat-primary-text-color)] placeholder-[var(--action-chat-secondary-text-color)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--action-choice-active-color)] focus:bg-[var(--action-chat-background-color)]/80 transition-all duration-200"
        />
        <ActionButton
          onClick={() => console.log("Envoyer")}
          label={isMobile ? "" : "Envoyer"}
          leftSection={
            isMobile ? (
              <FontAwesomeIcon icon={faCircleArrowUp} className="text-xl" />
            ) : null
          }
          color={{ color: ColorType.PRIMARY }}
        />
      </div>
    </div>
  );
}
