import { useTranslation } from "@/hooks/useTranslation";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useMessagesStore } from "@/store/messages/messages.store";
import { useGameStore } from "@/store/game/game";
import { useEffect, useState, useRef } from "react";
import { gameService } from "@/services/game/game.service";

export default function Chat() {
  const { t } = useTranslation();
  const { id } = useGameStore();
  const { messages, initializeMessages } = useMessagesStore();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      initializeMessages(id);
    }
  }, [id, initializeMessages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (message: string) => {
    if (id) {
      gameService.sendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full">
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-[var(--action-chat-secondary-text-color)]/80">
              {t("Discutez avec vos amis !")}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-2 mb-4 chat-scrollbar">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              player={message.player.name}
              time={message.date}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      <div className="flex gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder={t("Envoie ton message...")}
          className="flex-1 px-3 py-2 bg-[var(--text-color)]/15 backdrop-blur-sm rounded-lg text-[var(--text-color)] text-sm placeholder-[var(--action-chat-secondary-text-color)]/60 focus:outline-none focus:ring-1 focus:ring-[var(--action-choice-active-color)] transition-all duration-200"
        />
        <button
          onClick={() => handleSendMessage(message)}
          className="cursor-pointer bg-[var(--text-color)]/15 backdrop-blur-sm rounded-lg p-2 hover:bg-[var(--text-color)]/35 transition-all duration-200 transform hover:scale-105"
        >
          <FontAwesomeIcon icon={faCircleArrowUp} size="lg" color="#ffffff" />
        </button>
      </div>
    </div>
  );
}
