interface ChatMessageProps {
  message: string;
  player: string;
  time: string;
}

export default function ChatMessage({
  message,
  player,
  time,
}: ChatMessageProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-lg p-3 hover:bg-white/15 transition-all duration-200">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[var(--action-chat-primary-text-color)] text-xs font-medium">
          {player}
        </span>
        <span className="text-[var(--action-chat-secondary-text-color)] text-xs opacity-60">
          {time}
        </span>
      </div>
      <span className="text-[var(--action-chat-primary-text-color)] text-sm">
        {message}
      </span>
    </div>
  );
}
